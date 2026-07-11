import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Github, Twitter, Linkedin } from './SocialIcons';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="matisse-footer">
      <div className="footer-container">
        {/* Row 1: Logo + Description + Newsletter | Quick Links */}
        <div className="footer-row-1">
          {/* Left Column: Logo → Description → Newsletter */}
          <div className="footer-col-left">
            <img src="/logo-wt.svg" alt="Matisse" style={{ height: '48px', display: 'block', objectFit: 'contain' }} />
            {/* <p className="footer-brand-desc">
              Harness Material 3 color algorithms to craft beautiful, high-fidelity, and accessible design system tokens in seconds.
            </p> */}
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

          {/* Right Column: Quick Links */}
          <div className="footer-col-right">
            <div className="footer-links-group">
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
              <div className="footer-links-column">
                <h4 className="footer-column-title">Legal</h4>
                <ul className="footer-links-list">
                  <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#terms" className="footer-link">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Copyright | Social Icons */}
        <div className="footer-row-2">
          <div className="footer-col-left">
            <p className="footer-copyright">
              &copy; {currentYear} Matisse. Built with React, TypeScript &amp; Material 3 styling values. All rights reserved.
            </p>
          </div>
          <div className="footer-col-right">
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
