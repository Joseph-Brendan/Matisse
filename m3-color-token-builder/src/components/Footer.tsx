import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="matisse-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand-title-row">
              <div className="footer-brand-icon">M</div>
              <span className="footer-brand-text">Matisse</span>
            </div>
            <p className="footer-brand-desc">
              Harness Material 3 color algorithms to craft beautiful, high-fidelity, and accessible design system tokens in seconds.
            </p>
            <div className="footer-social-links">
              {/* GitHub Inline SVG */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              {/* Twitter/X Inline SVG */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* LinkedIn Inline SVG */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-column">
            <h4 className="footer-column-title">Product</h4>
            <ul className="footer-links-list">
              <li><a href="#features" className="footer-link">Color Builder</a></li>
              <li><a href="#tools" className="footer-link">Typography System</a></li>
              <li><a href="#tools" className="footer-link">Spacing Scale</a></li>
              <li><a href="#tools" className="footer-link">Elevation & Shadows</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="https://m3.material.io" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-external">M3 Guidelines <ArrowUpRight size={12} /></a></li>
              <li><a href="#how-it-works" className="footer-link">How it works</a></li>
              <li><a href="#faq" className="footer-link">FAQ Support</a></li>
              <li><a href="https://github.com" className="footer-link">Github Repo</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="footer-newsletter-column">
            <h4 className="footer-column-title">Stay Updated</h4>
            <p className="footer-newsletter-desc">
              Subscribe to get the latest updates on Material 3 guidelines and Matisse updates.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="footer-newsletter-input"
              />
              <button type="submit" className="footer-newsletter-submit">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} Matisse. Built with React, TypeScript &amp; Material 3 styling values. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
            <a href="#terms" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
