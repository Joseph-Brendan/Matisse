import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from './SocialIcons';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="matisse-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col footer-col--brand">
            <img src="/logo-wt.svg" alt="Matisse" className="footer-logo" />
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-col-desc">
              Subscribe to get the latest updates on Material 3 guidelines and Matisse updates.
            </p>
            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="footer-form-input"
              />
              <button type="submit" className="footer-form-submit">
                Join
              </button>
            </form>
          </div>

          {/* Column 2: Product */}
          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links">
              <li>
                <Link to="/#features" className="footer-link">
                  Color Builder
                </Link>
              </li>
              <li>
                <Link to="/#tools" className="footer-link">
                  Typography System
                </Link>
              </li>
              <li>
                <Link to="/#tools" className="footer-link">
                  Spacing Scale
                </Link>
              </li>
              <li>
                <Link to="/#tools" className="footer-link">
                  Elevation & Shadows
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://m3.material.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-link--external"
                >
                  M3 Guidelines <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <Link to="/#how-it-works" className="footer-link">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="footer-link">
                  FAQ Support
                </Link>
              </li>
              <li>
                <a href="https://github.com" className="footer-link">
                  Github Repo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal + Social */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="footer-social">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Matisse. Built by Dev and Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
