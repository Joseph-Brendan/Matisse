import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GlossyButton } from '../design-system/components';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--visible navbar-header--scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <img src="/logo-drk.svg" alt="Matisse" style={{ height: '38px', display: 'block', objectFit: 'contain' }} />
        </div>

        <nav className="navbar-desktop-nav desktop-only">
          <a href="#features" className="navbar-link" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
          <a href="#how-it-works" className="navbar-link" onClick={(e) => handleNavClick(e, 'how-it-works')}>How it works</a>
        </nav>

        <div className="navbar-actions">
          {user ? (
            /* Desktop: show avatar + name */
            <div className="navbar-profile-wrapper desktop-only">
              <button className="navbar-profile-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="navbar-avatar" style={{ '--avatar-bg': user.avatarColor } as React.CSSProperties}>
                  {user.initials}
                </div>
                <span className="navbar-profile-name">{user.name}</span>
                <ChevronDown size={16} style={{ color: '#6b7280' }} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="navbar-dropdown-overlay" onClick={() => setDropdownOpen(false)} />
                  <div className="navbar-dropdown-menu">
                    <div className="navbar-dropdown-header">
                      <div className="navbar-dropdown-avatar" style={{ background: user.avatarColor }}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="navbar-dropdown-header-title">{user.name}</p>
                        <p className="navbar-dropdown-header-subtitle">{user.email}</p>
                      </div>
                    </div>
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/dashboard'); }}>
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    <button className="navbar-dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                      <Settings size={16} />
                      Settings
                    </button>
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item navbar-dropdown-item--logout" onClick={() => { setDropdownOpen(false); logout(); navigate('/'); }}>
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="desktop-only navbar-actions">
              <GlossyButton variant="ghost" size="lg" onClick={() => navigate('/auth')}>Login</GlossyButton>
              <GlossyButton size="lg" onClick={() => navigate('/auth')}>Try for free</GlossyButton>
            </div>
          )}

          <button className="navbar-mobile-toggle mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <a href="#features" className="navbar-mobile-link" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
          <a href="#how-it-works" className="navbar-mobile-link" onClick={(e) => handleNavClick(e, 'how-it-works')}>How it works</a>
          <div className="navbar-mobile-divider" />

          {user ? (
            <>
              <div className="navbar-mobile-profile">
                <div className="navbar-mobile-avatar" style={{ background: user.avatarColor }}>{user.initials}</div>
                <div>
                  <p className="navbar-mobile-name">{user.name}</p>
                  <p className="navbar-mobile-email">{user.email}</p>
                </div>
              </div>
              <button className="navbar-mobile-link navbar-mobile-link--action" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button className="navbar-mobile-link navbar-mobile-link--action" onClick={() => { setMobileMenuOpen(false); navigate('/settings'); }}>
                <Settings size={18} /> Settings
              </button>
              <div className="navbar-mobile-divider" />
              <button className="navbar-mobile-link navbar-mobile-link--action navbar-mobile-link--logout" onClick={() => { setMobileMenuOpen(false); logout(); navigate('/'); }}>
                <LogOut size={18} /> Sign Out
              </button>
            </>
          ) : (
            <div className="navbar-mobile-actions">
              <GlossyButton variant="outline" size="lg" fullWidth onClick={() => navigate('/auth')}>Login</GlossyButton>
              <GlossyButton size="lg" fullWidth onClick={() => navigate('/auth')}>Try for free</GlossyButton>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
