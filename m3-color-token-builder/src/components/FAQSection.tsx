import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../design-system/components/Badge/Badge';
import './FAQSection.css';

const faqs = [
  {
    q: 'What is the HCT color space and why does Matisse use it?',
    a: 'HCT (Hue, Chroma, Tone) is the color model used by Material Design 3. Unlike RGB or HSL, HCT aligns perfectly with human physiological vision. It guarantees consistent, predictable contrast ratios between backgrounds, texts, and accents, making accessibility checks automatic.',
  },
  {
    q: 'Can I export Matisse design tokens for multiple platforms?',
    a: 'Absolutely. Matisse is designed for immediate web and mobile deployment. You can export generated scale variables as standard CSS custom properties, a formatted JSON token file, or a modular Tailwind configuration object.',
  },
  {
    q: 'Does Matisse handle both Light and Dark semantic modes?',
    a: 'Yes. Matisse computes tone targets for both environments. When you select a key seed color, it maps it to Material 3 standard roles like onPrimary, primaryContainer, onPrimaryContainer, surface, and outline for both themes simultaneously.',
  },
  {
    q: 'Is Matisse suitable for custom enterprise design systems?',
    a: 'Yes, Matisse allows you to add optional custom color roles outside the standard primary/secondary core palette. These custom roles are passed through the same Material tonal scaling engine, outputting matching semantic tokens.',
  },
];

export const FAQSection: React.FC = () => {
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-split-layout">
        <div className="faq-left-content">
          <Badge variant="primary" size="md">
            FAQ
          </Badge>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Got questions? We have got the answers.</p>
        </div>
        <div className="faq-right-accordion">
          <div className="faq-accordion-stack">
            {faqs.map((faq, i) => {
              const isOpen = faqOpenIdx === i;
              return (
                <div key={i} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <div
                    className="faq-accordion-trigger"
                    onClick={() => toggleFaq(i)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFaq(i);
                      }
                    }}
                  >
                    <span className="faq-question-text" id={`faq-q-${i}`}>
                      {faq.q}
                    </span>
                    <span className="faq-icon-toggle" aria-hidden="true">
                      <ChevronDown size={18} />
                    </span>
                  </div>
                  <div
                    className={`faq-accordion-panel ${isOpen ? 'open' : ''}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                  >
                    <div className="faq-accordion-panel-inner">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
