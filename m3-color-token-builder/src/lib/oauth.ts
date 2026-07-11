const POPUP_WIDTH = 600;
const POPUP_HEIGHT = 700;
const CLOSE_GRACE_MS = 1500;

export function openOAuthPopup(url: string): Promise<{ provider: string; code?: string; idToken?: string; email?: string; name?: string }> {
  const left = window.screenX + (window.innerWidth - POPUP_WIDTH) / 2;
  const top = window.screenY + (window.innerHeight - POPUP_HEIGHT) / 2;
  const popup = window.open(
    url,
    'oauth-popup',
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},popup=1`
  );

  if (!popup) {
    return Promise.reject(new Error('Popup blocked. Please allow popups for this site.'));
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const settle = (err: Error | null, result?: any) => {
      if (settled) return;
      settled = true;
      window.removeEventListener('message', handleMessage);
      if (closeTimer) clearTimeout(closeTimer);
      clearInterval(pollTimer);
      if (err) reject(err);
      else resolve(result);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'oauth-result') return;
      if (event.data.error) {
        settle(new Error(event.data.error));
      } else {
        settle(null, event.data.payload);
      }
    };

    const pollTimer = setInterval(() => {
      if (settled) return;
      if (popup.closed) {
        if (closeTimer === null) {
          closeTimer = setTimeout(() => {
            settle(new Error('OAuth popup was closed before completing sign-in.'));
          }, CLOSE_GRACE_MS);
        }
      } else {
        if (closeTimer !== null) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      }
    }, 200);

    window.addEventListener('message', handleMessage);
  });
}

export function generateState(provider: string): string {
  const state = `${provider}_${crypto.randomUUID()}`;
  localStorage.setItem('oauth_state', state);
  return state;
}

export function verifyState(state: string): string | null {
  const stored = localStorage.getItem('oauth_state');
  if (!stored || stored !== state) return null;
  localStorage.removeItem('oauth_state');
  const provider = state.split('_')[0];
  return provider;
}
