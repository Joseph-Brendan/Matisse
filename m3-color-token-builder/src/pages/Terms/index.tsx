import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SubpageHero } from '../../components/SubpageHero';
import '../Privacy/Legal.css';

export const Terms: React.FC = () => {
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
        badgeText="Terms"
        title="Terms of Service"
        subtitle="Last updated: July 12, 2026"
        centered
      />

      <div className="legal-container">
        {/* Quick Summary Callout */}
        <div className="legal-summary-card">
          <div className="summary-card-icon">
            <FileText size={24} />
          </div>
          <div className="summary-card-content">
            <h4>In Plain English</h4>
            <p>
              Welcome to Matisse. By using this tool to compile design scales and export variables,
              you agree to these standard rules. You own all output code files, templates, and
              systems you configure. Do not use Matisse for malicious operations or service
              flooding.
            </p>
          </div>
        </div>

        <div className="legal-content">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or utilizing Matisse (the "Service"), you agree to be bound by these Terms
            of Service. If you do not agree to these terms, do not access or use the Service.
          </p>

          <h2>2. License to Use Matisse</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to use
            Matisse for designing and building color systems, components, typography configurations,
            and token maps in accordance with these Terms.
          </p>
          <p>You agree not to:</p>
          <ul>
            <li>
              Reverse engineer, decompile, or copy the proprietary code scaling logic of the Matisse
              builder.
            </li>
            <li>
              Use automated bots or scripts to scrape data or flood color calculation endpoints.
            </li>
            <li>Distribute copies of the builder as a stand-alone commercial software product.</li>
          </ul>

          <h2>3. User-Generated Code and Tokens</h2>
          <p>
            You retain full ownership, copyrights, and intellectual property rights to any tokens,
            JSON files, CSS variables, and design templates you construct inside Matisse. Matisse
            claims zero ownership or licensing rights over your design systems.
          </p>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Matisse makes no
            guarantees that token outputs will perfectly fit custom accessibility compliance systems
            without review, nor does it guarantee uninterrupted availability of builder servers.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Matisse, its developers, or affiliates be liable for any indirect,
            incidental, special, or consequential damages arising out of your use of or inability to
            use the Service.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These terms and any disputes relating to the Service shall be governed by and construed
            in accordance with the laws of your local jurisdiction, without regard to conflicts of
            law principles.
          </p>

          <h2>7. Updates to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. When updates occur, we will post
            the changes here and revise the date at the top. Continued use of the Service indicates
            acceptance of updated terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
