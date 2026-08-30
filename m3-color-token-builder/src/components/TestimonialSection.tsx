import React from 'react';
import { Star, Check } from 'lucide-react';
import { Badge } from '../design-system/components/Badge/Badge';
import './TestimonialSection.css';

const testimonials = [
  {
    quote:
      'Matisse solved our designer-to-developer transition. We mapped our legacy color scheme into strict Material 3 scales in under ten minutes.',
    author: 'Elena Rostova',
    role: 'Design System Lead',
    company: 'Vectra Inc.',
    avatar: 'E',
  },
  {
    quote:
      'The HCT tone visualizer is a game-changer. Our accessibility errors plummeted to zero because the contrast target ratios are mathematically guaranteed.',
    author: 'Marcus Chen',
    role: 'Principal Frontend Engineer',
    company: 'ApexFlow',
    avatar: 'M',
  },
  {
    quote:
      'As a product manager, I love that we can download clean JSON tokens that immediately integrate into our cross-platform React Native and web builds.',
    author: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'PulseTech',
    avatar: 'S',
  },
];

export const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-header">
        <Badge variant="primary" size="md">
          Testimonials
        </Badge>
        <h2 className="section-title">Trusted by teams building better design systems</h2>
        <p className="section-subtitle">
          See how designers, developers, and vibe coders use Matisse to build consistent design
          systems faster from colors and typography to components and design tokens.
        </p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-quote-mark">“</div>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="star-icon-filled" />
              ))}
            </div>
            <p className="testimonial-quote">"{t.quote}"</p>
            <div className="testimonial-user-row">
              <div className="testimonial-avatar">{t.avatar}</div>
              <div className="testimonial-user-meta">
                <div className="testimonial-user-title-row">
                  <span className="testimonial-user-name">{t.author}</span>
                  <div className="testimonial-verified-badge">
                    <Check size={10} strokeWidth={3} />
                    <span>Verified</span>
                  </div>
                </div>
                <span className="testimonial-user-role">
                  {t.role}, {t.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
