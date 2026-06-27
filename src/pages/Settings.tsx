import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="card card-large">
      <h2>
        <SettingsIcon className="icon" aria-hidden="true" />
        Settings
      </h2>
      <p>Customize your experience with accessibility options.</p>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600 }}>High Contrast Mode</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Enable high-contrast colors for better readability (WCAG AAA compliant)
            </div>
          </div>
          <label
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              minHeight: '44px',
              padding: '0.5rem 0',
            }}
          >
            <span className="sr-only">Toggle high contrast mode</span>
            <input
              type="checkbox"
              checked={theme === 'high-contrast'}
              onChange={(e) => setTheme(e.target.checked ? 'high-contrast' : 'default')}
              style={{
                position: 'absolute',
                opacity: 0,
                width: 0,
                height: 0,
              }}
            />
            <div
              style={{
                width: '48px',
                height: '28px',
                backgroundColor: theme === 'high-contrast' ? 'var(--accent)' : 'var(--border)',
                borderRadius: '9999px',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'white',
                  borderRadius: '9999px',
                  transform: theme === 'high-contrast' ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'transform 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
