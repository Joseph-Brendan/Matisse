import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, LogIn, UserPlus } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Input } from '../../design-system/components/Input/Input';
import { Alert } from '../../design-system/components/Alert/Alert';
import { Tabs, TabPanel } from '../../design-system/components/Tabs/Tabs';
import { useAuthStore } from '../../store/useAuthStore';
import './Auth.css';

const authTabs = [
  { id: 'login', label: 'Sign In', icon: <LogIn size={16} /> },
  { id: 'signup', label: 'Create Account', icon: <UserPlus size={16} /> },
];

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} fullWidth />
      <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <div className="auth-form-row">
        <button type="button" className="auth-forgot-btn">Forgot password?</button>
      </div>
      <div className="auth-submit-row">
        <GlossyButton type="submit" loading={loading} fullWidth size="lg">
          <LogIn size={18} />
          Sign In
        </GlossyButton>
      </div>
    </form>
  );
};

const SignUpForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('All fields are required.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(name, email);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Full name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} icon={<User size={18} />} fullWidth />
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} fullWidth />
      <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <Input label="Confirm password" type="password" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <div className="auth-submit-row">
        <GlossyButton type="submit" loading={loading} fullWidth size="lg">
          <UserPlus size={18} />
          Create Account
        </GlossyButton>
      </div>
    </form>
  );
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    if (activeTab === 'login') {
      setSuccessMessage('Welcome back! Redirecting...');
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 800);
    } else {
      setSuccessMessage('Account created! Welcome to Matisse.');
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 800);
    }
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
            <div className="auth-brand-icon">M</div>
            <h1 className="auth-brand-title">
              {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="auth-brand-subtitle">
              {activeTab === 'login'
                ? 'Sign in to continue building your design system.'
                : 'Join Matisse and start building beautiful interfaces.'}
            </p>
          </div>

          {success ? (
            <div className="auth-success">
              <Alert variant="success" title="Success!">{successMessage}</Alert>
            </div>
          ) : (
            <div className="auth-tab-area">
              <Tabs
                tabs={authTabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="segmented"
                size="sm"
              >
                <TabPanel tabId="login">
                  <div style={{ marginTop: '1.25rem' }}>
                    <LoginForm onSuccess={handleSuccess} />
                  </div>
                </TabPanel>
                <TabPanel tabId="signup">
                  <div style={{ marginTop: '1.25rem' }}>
                    <SignUpForm onSuccess={handleSuccess} />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
