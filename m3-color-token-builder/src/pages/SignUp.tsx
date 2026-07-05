import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { Input } from '../design-system/components/Input/Input';
import { Alert } from '../design-system/components/Alert/Alert';
import { Card } from '../design-system/components/Card/Card';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
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
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Create your account</h1>
            <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
              Join Matisse and start building beautiful interfaces.
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <Alert variant="error" dismissible onDismiss={() => setError('')}>
                {error}
              </Alert>
            </div>
          )}

          {success && (
            <div style={{ marginBottom: '1rem' }}>
              <Alert
                variant="success"
                title="Account created!"
                dismissible
                onDismiss={() => setSuccess(false)}
              >
                Welcome to Matisse. Check your email to verify your account.
              </Alert>
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <GlossyButton onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </GlossyButton>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Full name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
                fullWidth
              />
              <Input
                label="Email address"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                fullWidth
              />
              <Input
                label="Confirm password"
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock size={18} />}
                fullWidth
              />
              <GlossyButton
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                style={{ marginTop: '0.5rem' }}
              >
                Create Account
              </GlossyButton>
            </form>
          )}

          {!success && (
            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--md-ref-role-onSurfaceVariant)', margin: '1rem 0 0' }}>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--md-ref-role-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 'inherit',
                }}
              >
                Sign in
              </button>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};
