import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useInertBackdrop } from '../hooks/useInertBackdrop';
import './ShortcutHelpOverlay.css';

interface ShortcutHelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
}

const shortcutGroups = [
  {
    title: 'Global',
    shortcuts: [
      { keys: ['?'], description: 'Open keyboard shortcut help' },
      { keys: ['Esc'], description: 'Close the current dialog or overlay' },
      { keys: ['Cmd', 'K'], description: 'Open the command menu when available' },
    ],
  },
  {
    title: 'Wallet',
    shortcuts: [
      { keys: ['Tab'], description: 'Move through wallet controls and connection actions' },
      { keys: ['Enter'], description: 'Activate the focused wallet action' },
    ],
  },
  {
    title: 'Wizard',
    shortcuts: [
      { keys: ['←'], description: 'Move to the previous onboarding step where supported' },
      { keys: ['→'], description: 'Advance to the next onboarding step where supported' },
    ],
  },
  {
    title: 'Notifications',
    shortcuts: [
      { keys: ['Tab'], description: 'Move between tabs, preferences, and actions' },
      { keys: ['Esc'], description: 'Close the notification center and return to the trigger' },
    ],
  },
];

export function ShortcutHelpOverlay({
  isOpen,
  onClose,
  triggerRef,
}: ShortcutHelpOverlayProps) {
  const modalId = 'shortcut-help-overlay';
  const containerRef = useFocusTrap({
    isActive: isOpen,
    triggerRef,
    onEscape: onClose,
  });

  useBodyScrollLock({ isLocked: isOpen });
  useInertBackdrop({ isInert: isOpen, modalId });

  if (!isOpen) return null;

  return (
    <div id={modalId} className="shortcut-help-overlay">
      <div className="shortcut-help-backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={containerRef}
        className="shortcut-help-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcut-help-title"
        aria-describedby="shortcut-help-description"
      >
        <div className="shortcut-help-header">
          <div>
            <p className="shortcut-help-kicker">Keyboard shortcuts</p>
            <h2 id="shortcut-help-title">Move around faster</h2>
            <p id="shortcut-help-description">
              Press <kbd>?</kbd> any time outside a form field to reopen this guide.
            </p>
          </div>
          <button
            type="button"
            className="shortcut-help-close"
            aria-label="Close keyboard shortcut help"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="shortcut-help-groups">
          {shortcutGroups.map((group) => (
            <section key={group.title} className="shortcut-help-group" aria-labelledby={`${group.title}-heading`}>
              <h3 id={`${group.title}-heading`}>{group.title}</h3>
              <ul>
                {group.shortcuts.map((shortcut) => (
                  <li key={`${group.title}-${shortcut.description}`}>
                    <span className="shortcut-help-keys" aria-hidden="true">
                      {shortcut.keys.map((key) => (
                        <kbd key={key}>{key}</kbd>
                      ))}
                    </span>
                    <span>{shortcut.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="shortcut-help-footer">
          <Link className="shortcut-help-settings-link" to="/help#shortcuts" onClick={onClose}>
            Settings and shortcut notes
          </Link>
        </div>
      </div>
    </div>
  );
}
