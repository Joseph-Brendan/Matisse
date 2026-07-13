import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import './DockedHeader.css';

interface DockedHeaderProps {
  scrollY: number;
}

export const DockedHeader: React.FC<DockedHeaderProps> = ({ scrollY }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="docked-header"
      style={{
        opacity: Math.max(0, 1 - scrollY / 20),
        pointerEvents: scrollY > 20 ? ('none' as const) : ('auto' as const),
      }}
    >
      <div className="docked-header-left">
        <div className="docked-header-brand" onClick={() => navigate('/')}>
          <img src="/logo-drk.svg" alt="Matisse" style={{ height: '38px', display: 'block', objectFit: 'contain' }} />
        </div>
        <nav className="desktop-only docked-header-links">
          <a
            href="#features"
            className="docked-header-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="docked-header-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}
          >
            How it works
          </a>
          <a
            href="/about"
            className="docked-header-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/about');
            }}
          >
            About
          </a>
        </nav>
      </div>

      <div className="docked-header-right">
        {user ? (
          <button className="docked-header-btn" onClick={() => navigate('/dashboard')}>
            <span>Dashboard</span>
            <div className="docked-header-btn-circle">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ) : (
          <button className="docked-header-btn" onClick={() => navigate('/auth')}>
            <span>Log In</span>
            <div className="docked-header-btn-circle">
              <ArrowUpRight size={16} />
            </div>
          </button>
        )}
      </div>
    </header>
  );
};
