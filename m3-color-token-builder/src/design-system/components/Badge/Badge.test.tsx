import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default').closest('span');
    expect(badge).toHaveClass('badge--neutral', 'badge--sm');
  });

  it('renders dot indicator when dot is true', () => {
    render(<Badge dot>With Dot</Badge>);
    const badge = screen.getByText('With Dot').closest('span');
    expect(badge?.querySelector('span')).toBeInTheDocument();
  });

  it('renders remove button when removable is true', () => {
    render(<Badge removable>Removable</Badge>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Remove Me
      </Badge>,
    );
    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom').closest('span');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders all variants without error', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'error',
      'success',
      'warning',
      'info',
      'neutral',
    ] as const;
    for (const v of variants) {
      const { container } = render(<Badge variant={v}>{v}</Badge>);
      expect(container.querySelector('.badge')).toBeInTheDocument();
    }
  });
});
