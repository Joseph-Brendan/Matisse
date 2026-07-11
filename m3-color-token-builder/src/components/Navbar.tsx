import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GlossyButton } from '../design-system/components';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to add slight shadow details if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page/auth transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--visible navbar-header--scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => navigate('/')}>
          
          <img src="/logo-drk.svg" alt="Matisse" style={{ height: '54px', display: 'block', objectFit: 'contain' }} />
        </div>

        {/* Desktop Menu Links */}
        <nav className="navbar-desktop-nav desktop-only">
          <a
            href="#features"
            className="navbar-link"
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="navbar-link"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
          >
            How it works
          </a>
          <a
            href="#"
            className="navbar-link"
            onClick={(e) => { e.preventDefault(); navigate('/about'); }}
          >
            About
          </a>
        </nav>

        {/* Right CTA Actions or User Profile */}
        <div className="navbar-actions">
          {user ? (
            /* User Info Block - CTAs hidden, avatar & name shown */
            <div className="navbar-profile-wrapper">
              <button
                className="navbar-profile-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* User Avatar - Styled using dynamic CSS property */}
                <div
                  className="navbar-avatar"
                  style={{ '--avatar-bg': user.avatarColor } as React.CSSProperties}
                >
                  {user.initials}
                </div>
                {/* User Name */}
                <span className="navbar-profile-name">{user.name}</span>
                <ChevronDown size={16} style={{ color: '#6b7280' }} />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="navbar-dropdown-overlay"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="navbar-dropdown-menu">
                    <div className="navbar-dropdown-header">
                      <p className="navbar-dropdown-header-subtitle">Signed in as</p>
                      <p className="navbar-dropdown-header-title">{user.email}</p>
                    </div>
                    <button
                      className="navbar-dropdown-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/dashboard');
                      }}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    <button
                      className="navbar-dropdown-item navbar-dropdown-item--logout"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Login & Try for Free CTAs */
            <div className="desktop-only navbar-actions">
              <GlossyButton variant="ghost" size="lg" onClick={() => navigate('/auth')}>
                Login
              </GlossyButton>
              <GlossyButton size="lg" onClick={() => navigate('/auth')}>
                Try for free
              </GlossyButton>
            </div>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            className="navbar-mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <a
            href="#features"
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
          >
            How it works
          </a>
          <a
            className="navbar-mobile-link"
            onClick={() => { setMobileMenuOpen(false); navigate('/about'); }}
          >
            About
          </a>

          {!user && (
            <div className="navbar-mobile-actions">
              <GlossyButton variant="outline" size="lg" fullWidth onClick={() => navigate('/auth')}>
                Login
              </GlossyButton>
              <GlossyButton size="lg" fullWidth onClick={() => navigate('/auth')}>
                Try for free
              </GlossyButton>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
