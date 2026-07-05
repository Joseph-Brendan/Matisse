import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, LogIn, UserPlus } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Input } from '../../design-system/components/Input/Input';
import { Alert } from '../../design-system/components/Alert/Alert';
import { Card } from '../../design-system/components/Card/Card';
import { Tabs, TabPanel } from '../../design-system/components/Tabs/Tabs';
const authTabs = [
  { id: 'login', label: 'Sign In', icon: <LogIn size={16} /> },
  { id: 'signup', label: 'Create Account', icon: <UserPlus size={16} /> },
];

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} fullWidth />
      <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--md-ref-role-primary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
          Forgot password?
        </button>
      </div>
      <GlossyButton type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: '0.5rem' }}>
        <LogIn size={18} />
        Sign In
      </GlossyButton>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('All fields are required.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && <Alert variant="error" dismissible onDismiss={() => setError('')}>{error}</Alert>}
      <Input label="Full name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} icon={<User size={18} />} fullWidth />
      <Input label="Email address" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} fullWidth />
      <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <Input label="Confirm password" type="password" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<Lock size={18} />} fullWidth />
      <GlossyButton type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: '0.5rem' }}>
        <UserPlus size={18} />
        Create Account
      </GlossyButton>
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--md-ref-role-background)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--md-ref-role-onSurfaceVariant)',
            fontSize: '0.875rem',
            padding: '0.5rem 0',
            marginBottom: '1rem',
          }}
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <Card variant="elevated" padding="lg">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, hsl(256, 34%, 48%), hsl(340, 21%, 41%))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.25rem',
                margin: '0 auto 0.75rem',
              }}
            >
              M
            </div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
              {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
              {activeTab === 'login' ? 'Sign in to continue to your dashboard.' : 'Join Matisse and start building beautiful interfaces.'}
            </p>
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <Alert variant="success" title="Success!">{successMessage}</Alert>
            </div>
          ) : (
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
          )}
        </Card>
      </div>
    </div>
  );
};
