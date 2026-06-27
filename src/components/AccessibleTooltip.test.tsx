import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AccessibleTooltip } from './AccessibleTooltip';

describe('AccessibleTooltip', () => {
  it('connects the focusable help trigger to tooltip content', () => {
    render(<AccessibleTooltip label="Explain this field." />);

    const trigger = screen.getByLabelText('More information');
    const tooltip = screen.getByRole('tooltip');

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    expect(trigger).toHaveAttribute('tabindex', '0');
    expect(tooltip).toHaveTextContent('Explain this field.');
  });
});
