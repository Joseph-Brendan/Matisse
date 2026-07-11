export interface OAuthResult {
  email?: string;
  name?: string;
  code?: string;
  error?: string;
}

export function generateState(provider: string): string {
  const raw = `${provider}-${crypto.randomUUID()}-${Date.now()}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  return crypto.subtle
    ? Array.from(new Uint8Array(data))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 32)
    : raw.replace(/-/g, '').slice(0, 32);
}

export function openOAuthPopup(url: string): Promise<OAuthResult> {
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  const popup = window.open(
    url,
    'oauth-popup',
    `width=${width},height=${height},left=${left},top=${top},popup=1`
  );

  if (!popup) {
    return Promise.reject(new Error('Popup blocked. Please allow popups for this site.'));
  }

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(timer);
          reject(new Error('Sign-in cancelled.'));
          return;
        }

        const href = popup.location.href;
        const currentOrigin = window.location.origin;

        if (href.startsWith(currentOrigin + '/auth/callback')) {
          const params = new URLSearchParams(href.split('?')[1] || '');
          const hash = href.includes('#') ? new URLSearchParams(href.split('#')[1] || '') : new URLSearchParams();

          const idToken = hash.get('id_token');
          const accessToken = hash.get('access_token') || params.get('code');
          const error = params.get('error') || hash.get('error');

          if (error) {
            popup.close();
            clearInterval(timer);
            reject(new Error(decodeURIComponent(error)));
            return;
          }

          popup.close();
          clearInterval(timer);

          if (idToken) {
            const payload = JSON.parse(atob(idToken.split('.')[1]));
            resolve({
              email: payload.email,
              name: payload.name,
            });
          } else if (accessToken) {
            resolve({ code: accessToken });
          } else {
            resolve({});
          }
        }
      } catch {
        // cross-origin until redirect lands on same origin — safe to ignore
      }
    }, 200);

    setTimeout(() => {
      clearInterval(timer);
      popup.close();
      reject(new Error('Sign-in timed out.'));
    }, 120_000);
  });
}
