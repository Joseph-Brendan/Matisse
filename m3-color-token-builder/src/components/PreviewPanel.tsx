import React, { useState } from 'react';
import { useColorStore } from '../store/useColorStore';

export const PreviewPanel: React.FC = () => {
    const { roles, theme } = useColorStore();

    // Choose which roles to display based on some local toggle or global theme.
    // For now we'll just use the active global theme.
    const activeRoles = roles[theme];

    // Generate CSS variables for the preview container
    const previewStyle: React.CSSProperties = {
        padding: '2rem',
        borderRadius: '12px',
        backgroundColor: 'var(--role-surface)',
        color: 'var(--role-onSurface)',
        border: '1px solid var(--role-outlineVariant)',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden'
    };

    activeRoles.forEach(r => {
        (previewStyle as any)[`--role-${r.name}`] = r.resolvedValue;
    });

    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password123');
    const [isHoverEmail, setHoverEmail] = useState(false);
    const [isFocusEmail, setFocusEmail] = useState(false);
    const [isHoverPwd, setHoverPwd] = useState(false);
    const [isFocusPwd, setFocusPwd] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [btnHover, setBtnHover] = useState(false);
    const [showAnatomy, setShowAnatomy] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        // Simulate network request then error
        setTimeout(() => {
            setIsLoading(false);
            setIsError(true);
        }, 1500);
    };

    const getInputBorder = (isFocus: boolean, isHover: boolean, forceError: boolean = false) => {
        if (forceError) return '2px solid var(--role-error)';
        if (isFocus) return '2px solid var(--role-primary)';
        if (isHover) return '1px solid var(--role-onSurface)';
        return '1px solid var(--role-outline)';
    };

    const inputBg = 'var(--role-surfaceContainerHighest)';
    const inputColor = 'var(--role-onSurface)';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Live Preview</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Interact with the form to test live token assignments.</p>
                </div>
                <button
                    onClick={() => setShowAnatomy(!showAnatomy)}
                    style={{
                        padding: '0.5rem 1rem', background: showAnatomy ? '#1f2937' : '#f3f4f6',
                        color: showAnatomy ? '#f9fafb' : '#374151', border: '1px solid #d1d5db',
                        borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer'
                    }}
                >
                    {showAnatomy ? 'Hide Color Anatomy' : 'Show Color Anatomy'}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* PREVIEW COMPONENT */}
                <div style={{ flex: '1 1 400px', minWidth: 0 }}>
                    <div style={previewStyle}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '320px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--role-primary)' }}>Welcome back</h3>
                                <p style={{ margin: '0.5rem 0 0', color: 'var(--role-onSurfaceVariant)', fontSize: '0.875rem' }}>Sign in to continue to your dashboard</p>
                            </div>

                            {/* EMAIL INPUT */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: isError ? 'var(--role-error)' : (isFocusEmail ? 'var(--role-primary)' : 'var(--role-onSurface)') }}>
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onMouseEnter={() => setHoverEmail(true)}
                                    onMouseLeave={() => setHoverEmail(false)}
                                    onFocus={() => { setFocusEmail(true); setIsError(false); }}
                                    onBlur={() => setFocusEmail(false)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: inputBg,
                                        color: inputColor,
                                        border: getInputBorder(isFocusEmail, isHoverEmail, isError),
                                        borderRadius: '8px',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            </div>

                            {/* PASSWORD INPUT */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: isError ? 'var(--role-error)' : (isFocusPwd ? 'var(--role-primary)' : 'var(--role-onSurface)') }}>
                                        Password
                                    </label>
                                    <a href="#" style={{ fontSize: '0.75rem', color: 'var(--role-primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onMouseEnter={() => setHoverPwd(true)}
                                    onMouseLeave={() => setHoverPwd(false)}
                                    onFocus={() => { setFocusPwd(true); setIsError(false); }}
                                    onBlur={() => setFocusPwd(false)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: inputBg,
                                        color: inputColor,
                                        border: getInputBorder(isFocusPwd, isHoverPwd, isError),
                                        borderRadius: '8px',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s'
                                    }}
                                />
                                {isError && (
                                    <span style={{ color: 'var(--role-error)', fontSize: '0.75rem', fontWeight: 500 }}>
                                        Invalid email or password. Please try again.
                                    </span>
                                )}
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                onMouseEnter={() => setBtnHover(true)}
                                onMouseLeave={() => setBtnHover(false)}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'var(--role-primary)',
                                    color: 'var(--role-onPrimary)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s',
                                    filter: btnHover && !isLoading ? 'brightness(0.9)' : 'none',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div style={{ width: '16px', height: '16px', border: '2px solid var(--role-onPrimary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                        Signing in...
                                    </>
                                ) : 'Sign in'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--role-onSurfaceVariant)' }}>
                                    Don't have an account? <a href="#" style={{ color: 'var(--role-primary)', textDecoration: 'none', fontWeight: 600 }}>Create one</a>
                                </span>
                            </div>
                        </form>
                        <style>
                            {`
                                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            `}
                        </style>
                    </div>
                </div>

                {/* ANATOMY PANEL */}
                {showAnatomy && (
                    <div className="card" style={{ flex: '1 1 300px', margin: 0, border: '1px solid #d1d5db', background: '#f9fafb' }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Color Anatomy</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                            <AnatomyRow element="Form Background" role="surface" color="var(--role-surface)" />
                            <AnatomyRow element="Primary Headings" role="primary" color="var(--role-primary)" />
                            <AnatomyRow element="Body Text" role="onSurface" color="var(--role-onSurface)" />
                            <AnatomyRow element="Subtitle Text" role="onSurfaceVariant" color="var(--role-onSurfaceVariant)" />
                            <AnatomyRow element="Input Background" role="surfaceContainerHighest" color="var(--role-surfaceContainerHighest)" />
                            <AnatomyRow element="Input Border (Default)" role="outline" color="var(--role-outline)" />
                            <AnatomyRow element="Input Border (Hover)" role="onSurface" color="var(--role-onSurface)" />
                            <AnatomyRow element="Input Border (Focus)" role="primary" color="var(--role-primary)" />
                            <AnatomyRow element="Error State" role="error" color="var(--role-error)" />
                            <AnatomyRow element="Button Background" role="primary" color="var(--role-primary)" />
                            <AnatomyRow element="Button Text/Spinner" role="onPrimary" color="var(--role-onPrimary)" />
                            <AnatomyRow element="Text Links" role="primary" color="var(--role-primary)" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AnatomyRow: React.FC<{ element: string, role: string, color: string }> = ({ element, role, color }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <span style={{ fontWeight: 500, color: '#374151' }}>{element}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '0.75rem' }}>{role}</span>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: color, border: '1px solid rgba(0,0,0,0.1)' }} />
        </div>
    </div>
);
