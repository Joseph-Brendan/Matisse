import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SubpageHero } from '../../components/SubpageHero';
import './Legal.css';

export const Privacy: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <Navbar />
      <SubpageHero
        scrollY={scrollY}
        badgeText="Compliance"
        title="Privacy Policy"
        subtitle="Last updated: July 12, 2026"
        centered
      />

      <div className="legal-container">
        {/* Quick Summary Callout */}
        <div className="legal-summary-card">
          <div className="summary-card-icon">
            <Shield size={24} />
          </div>
          <div className="summary-card-content">
            <h4>In Plain English</h4>
            <p>
              We build tools for design tokens. We do not sell your personal data, nor do we track
              your private designs. Your colors and typography variables belong to you. We use
              cookies and local storage only to remember your layout preferences and session
              configurations.
            </p>
          </div>
        </div>

        <div className="legal-content">
          <h2>1. Information We Collect</h2>
          <p>
            We collect data that you directly provide to us when you create an account, design seed
            tokens, or contact support. This includes:
          </p>
          <ul>
            <li>
              <strong>Account Data:</strong> Name, email address, password hashes, and profile
              preferences.
            </li>
            <li>
              <strong>Design Tokens Data:</strong> Generated color seeds, chroma settings,
              typography configurations, grids, custom templates, and settings stored in Matisse
              projects.
            </li>
            <li>
              <strong>Usage Metadata:</strong> Diagnostic logs, browser settings, and active session
              telemetry to maintain builder speed and prevent server errors.
            </li>
          </ul>

          <h2>2. How We Store and Secure Data</h2>
          <p>
            All private data is encrypted during transit and at rest. We utilize standardized
            security measures to protect account information:
          </p>
          <ul>
            <li>Session cookies are securely encrypted and marked HTTP-only.</li>
            <li>Builder projects are synced with cloud storage via modern SSL protocols.</li>
            <li>
              Payment details (if any) are processed securely through certified compliance layers
              (Stripe), with zero storage of raw credentials on Matisse servers.
            </li>
          </ul>

          <h2>3. Data Ownership and Export</h2>
          <p>
            <strong>Your variables are your intellectual property.</strong> Any design systems,
            configurations, or raw token formats (JSON, CSS, SCSS, or Tailwind configurations)
            compiled on Matisse are owned entirely by you. You may export or purge them from our
            databases at any time.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            Matisse utilizes certified third-party utilities for specific operations, including:
          </p>
          <ul>
            <li>
              <strong>Google Fonts API:</strong> Used to dynamically load typeface selections in the
              token playground. Load requests are processed directly from Google CDN.
            </li>
            <li>
              <strong>Analytics:</strong> Anonymous user patterns are monitored to check builder
              speeds and responsive load adjustments.
            </li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions or data requests regarding our compliance structures, contact
            our security desk at{' '}
            <a href="mailto:privacy@matisse.dev" className="legal-link">
              privacy@matisse.dev
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
