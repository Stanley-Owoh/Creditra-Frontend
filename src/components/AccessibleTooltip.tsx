import { useId } from 'react';
import './AccessibleTooltip.css';

interface AccessibleTooltipProps {
  /** Plain-text label surfaced visually and to assistive tech via `aria-describedby`. */
  label: string;
}

/**
 * Compact keyboard-focusable info trigger.
 *
 * Renders a small "i" affordance that surfaces `label` as a tooltip on
 * hover and keyboard focus. The trigger is `tabIndex={0}` (focusable
 * without being a button so it can sit inline next to labels), carries
 * `aria-label="More information"`, and is wired to the tooltip via
 * `aria-describedby` — so screen readers announce the label as the
 * trigger's accessible description.
 *
 * The visible tooltip itself uses `role="tooltip"`, and its show/hide
 * behaviour is controlled by `:hover` / `:focus-within` in
 * `AccessibleTooltip.css` — there's no JS state.
 */
export function AccessibleTooltip({ label }: AccessibleTooltipProps) {
  const tooltipId = useId();

  return (
    <span className="accessible-tooltip">
      <span
        tabIndex={0}
        className="accessible-tooltip__trigger"
        aria-label="More information"
        aria-describedby={tooltipId}
      >
        <span aria-hidden="true">i</span>
      </span>
      <span id={tooltipId} role="tooltip" className="accessible-tooltip__content">
        {label}
      </span>
    </span>
  );
}
