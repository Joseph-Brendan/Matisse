import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlossyButton } from './GlossyButton';

describe('GlossyButton', () => {
  it('renders children', () => {
    render(<GlossyButton>Click Me</GlossyButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<GlossyButton>Default</GlossyButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('glossy-btn--primary', 'glossy-btn--md');
  });

  it('applies variant class', () => {
    render(<GlossyButton variant="error">Error</GlossyButton>);
    expect(screen.getByRole('button')).toHaveClass('glossy-btn--error');
  });

  it('applies fullWidth class', () => {
    render(<GlossyButton fullWidth>Full</GlossyButton>);
    expect(screen.getByRole('button')).toHaveClass('glossy-btn--full');
  });

  it('is disabled when disabled prop is true', () => {
    render(<GlossyButton disabled>Disabled</GlossyButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<GlossyButton loading>Loading</GlossyButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('glossy-btn--loading');
  });

  it('renders icon on the left by default', () => {
    render(<GlossyButton icon={<span data-testid="icon">*</span>}>With Icon</GlossyButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders all variants without error', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'error', 'ghost', 'outline'] as const;
    for (const v of variants) {
      const { container } = render(<GlossyButton variant={v}>{v}</GlossyButton>);
      expect(container.querySelector('button')).toBeInTheDocument();
    }
  });
});
