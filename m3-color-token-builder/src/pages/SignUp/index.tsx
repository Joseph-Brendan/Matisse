import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Input } from '../../design-system/components/Input/Input';
import { Alert } from '../../design-system/components/Alert/Alert';
import { useAuthStore } from '../../store/useAuthStore';
import { openOAuthPopup, generateState } from '../../lib/oauth';
import './SignUp.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTermsError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setTermsError('You must accept the Terms and Conditions and Privacy Policy.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(name, email);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 800);
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setOauthLoading('google');
    setError('');
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const state = generateState('google');
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token%20token&scope=openid%20email%20profile&state=${state}&nonce=${crypto.randomUUID()}`;

      const result = await openOAuthPopup(url);
      if (result.email) {
        login(result.name || result.email.split('@')[0], result.email);
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 800);
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
    <div className="signup-page">
      <div className="signup-wrapper">
        <button className="signup-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="signup-glass-card">
          <div className="signup-brand">
            <img src="/login.icon.svg" alt="Login" className="signup-brand-logo" />
            <h1 className="signup-brand-title">Create your account</h1>
            <p className="signup-brand-subtitle">
              Join Matisse and start building beautiful interfaces.
            </p>
          </div>

          {success ? (
            <div className="signup-success">
              <Alert variant="success" title="Success!">Account created! Welcome to Matisse.</Alert>
            </div>
          ) : (
            <div className="signup-form-area">
              <form onSubmit={handleSubmit} className="signup-form">
                {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
                <Input label="Full name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
                <Input label="Confirm password" type="password" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
                <div className="signup-terms">
                  <input
                    type="checkbox"
                    id="terms"
                    className="signup-terms-checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      if (e.target.checked) setTermsError('');
                    }}
                    aria-describedby={termsError ? 'terms-error' : undefined}
                    aria-invalid={!!termsError}
                  />
                  <label htmlFor="terms" className="signup-terms-label">
                    I agree to the{' '}
                    <a href="/terms" className="signup-terms-link" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="/privacy" className="signup-terms-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                  </label>
                </div>
                {termsError && (
                  <p className="signup-terms-error" id="terms-error" role="alert">{termsError}</p>
                )}
                <div className="signup-submit-row">
                  <GlossyButton type="submit" loading={loading} fullWidth size="lg">
                    Sign Up
                  </GlossyButton>
                </div>

                <p className="signup-login-text">
                  Already have an account?{' '}
                  <Link to="/auth" className="signup-login-link">Log In</Link>
                </p>
              </form>

              <div className="signup-divider">
                <span className="signup-divider-line" />
                <span className="signup-divider-text">or</span>
                <span className="signup-divider-line" />
              </div>

              <div className="signup-social-row">
                <button type="button" className="signup-social-btn" aria-label="Continue with Google" onClick={handleGoogleLogin} disabled={oauthLoading !== null}>
                  <GoogleIcon />
                </button>
                <button type="button" className="signup-social-btn" aria-label="Continue with GitHub" onClick={handleGitHubLogin} disabled={oauthLoading !== null}>
                  <GitHubIcon />
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};