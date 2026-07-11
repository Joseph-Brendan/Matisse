import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Input } from '../../design-system/components/Input/Input';
import { Alert } from '../../design-system/components/Alert/Alert';
import { useAuthStore } from '../../store/useAuthStore';
import { openOAuthPopup, generateState } from '../../lib/oauth';
import './Auth.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const LoginForm: React.FC<{ onSuccess: () => void; onSwitchToSignup: () => void }> = ({ onSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const parsedName = email
        .split('@')[0]
        .split(/[._-]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
      login(parsedName, email);
      onSuccess();
    }, 1200);
  };

  const handleGoogleLogin = async () => {
    setOauthLoading('google');
    setError('');
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const state = generateState('google');
      const url = `https://google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token%20token&scope=openid%20email%20profile&state=${state}&nonce=${crypto.randomUUID()}`;

      const result = await openOAuthPopup(url);
      if (result.email) {
        login(result.name || result.email.split('@')[0], result.email);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleGitHubLogin = async () => {
    setOauthLoading('github');
    setError('');
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const state = generateState('github');
      const url = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${state}`;

      const result = await openOAuthPopup(url);
      if (result.code) {
        setError('GitHub sign-in requires a backend to exchange the authorization code. Configure a server endpoint and update the flow.');
      }
    } catch (err: any) {
      setError(err.message || 'GitHub sign-in failed.');
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <div className="auth-form-row">
        <button type="button" className="auth-forgot-btn">Forgot password?</button>
      </div>
      <div className="auth-submit-row">
        <GlossyButton type="submit" loading={loading} fullWidth size="lg">
          Login
        </GlossyButton>
      </div>

      <p className="auth-signup-text">
        Don&apos;t have an account?{' '}
        <button type="button" className="auth-signup-link" onClick={onSwitchToSignup} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
          Sign Up
        </button>
      </p>

      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <span className="auth-divider-line" />
      </div>

      <div className="auth-social-row">
        <button type="button" className="auth-social-btn" aria-label="Continue with Google" onClick={handleGoogleLogin} disabled={oauthLoading !== null}>
          <GoogleIcon />
        </button>
        <button type="button" className="auth-social-btn" aria-label="Continue with GitHub" onClick={handleGitHubLogin} disabled={oauthLoading !== null}>
          <GitHubIcon />
        </button>
      </div>
    </form>
  );
};

const SignupForm: React.FC<{ onSuccess: () => void; onSwitchToLogin: () => void }> = ({ onSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(name, email);
      onSuccess();
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Full name" type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <Input label="Password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <div className="auth-submit-row">
        <GlossyButton type="submit" loading={loading} fullWidth size="lg">
          Create Account
        </GlossyButton>
      </div>

      <p className="auth-signup-text">
        Already have an account?{' '}
        <button type="button" className="auth-signup-link" onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
          Login
        </button>
      </p>

      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <span className="auth-divider-line" />
      </div>

      <div className="auth-social-row">
        <button type="button" className="auth-social-btn" aria-label="Continue with Google">
          <GoogleIcon />
        </button>
        <button type="button" className="auth-social-btn" aria-label="Continue with GitHub">
          <GitHubIcon />
        </button>
      </div>
    </form>
  );
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <button className="auth-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="auth-glass-card">
          <div className="auth-brand">
            <img src="/logo-drk.svg" alt="Matisse" className="auth-brand-logo" />
            <h1 className="auth-brand-title">{mode === 'login' ? 'Welcome back!' : 'Create your account'}</h1>
            <p className="auth-brand-subtitle">
              {mode === 'login'
                ? 'Login to continue building your design system.'
                : 'Start building better design systems today.'}
            </p>
          </div>

          {success ? (
            <div className="auth-success">
              <Alert variant="success" title="Success!">{mode === 'login' ? 'Welcome back!' : 'Account created!'} Redirecting...</Alert>
            </div>
          ) : mode === 'login' ? (
            <div className="auth-tab-area">
              <LoginForm onSuccess={handleSuccess} onSwitchToSignup={() => setMode('signup')} />
              <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="auth-signup-link"
                  onClick={() => setMode('signup')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Don&apos;t have an account? <span style={{ fontWeight: 600 }}>Sign Up</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-tab-area">
              <SignupForm onSuccess={handleSuccess} onSwitchToLogin={() => setMode('login')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};