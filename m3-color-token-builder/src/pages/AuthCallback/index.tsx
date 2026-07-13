import { useEffect } from 'react';

export const AuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error') || params.get('error');
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const code = queryParams.get('code');
    const state = queryParams.get('state') || params.get('state');
    const storedState = localStorage.getItem('oauth_state');

    if (storedState && state && storedState !== state) {
      window.opener?.postMessage(
        { type: 'oauth-result', error: 'State mismatch. Possible CSRF attack.' },
        window.location.origin
      );
      window.close();
      return;
    }
    localStorage.removeItem('oauth_state');

    if (error) {
      window.opener?.postMessage(
        { type: 'oauth-result', error },
        window.location.origin
      );
      window.close();
      return;
    }

    if (idToken) {
      try {
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        window.opener?.postMessage(
          {
            type: 'oauth-result',
            payload: {
              provider: 'google',
              idToken,
              accessToken,
              email: payload.email,
              name: payload.name,
            },
          },
          window.location.origin
        );
        window.close();
        return;
      } catch {
        window.opener?.postMessage(
          { type: 'oauth-result', error: 'Failed to parse ID token.' },
          window.location.origin
        );
        window.close();
        return;
      }
    }

    if (code) {
      window.opener?.postMessage(
        {
          type: 'oauth-result',
          payload: { provider: 'github', code },
        },
        window.location.origin
      );
      window.close();
      return;
    }

    window.opener?.postMessage(
      { type: 'oauth-result', error: 'No authorization code or token received.' },
      window.location.origin
    );
    window.close();
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      color: '#6b7280',
      fontSize: '0.875rem',
    }}>
      Completing sign-in...
    </div>
  );
};
