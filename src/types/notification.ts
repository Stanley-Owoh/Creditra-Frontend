/**
 * Severity of a notification. Drives icon, color, and assertive vs
 * polite ARIA live-region semantics.
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'danger';

export type NotificationCategory =
  | 'transaction'
  | 'credit_line'
  | 'risk_score'
  | 'rate_change'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string; // ISO
  read: boolean;
  action?: { label: string; onClick: () => void };
}

/**
 * A transient toast notification. Unlike a regular Notification, a Toast
 * is not tracked in the read/unread inbox — it lives only for the
 * duration of its display.
 */
export interface Toast extends Omit<Notification, 'read'> {
  duration?: number; // ms, default 5500
  persistent?: boolean;
}

export interface BannerAlert {
  id: string;
  type: NotificationType;
  message: string;
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
}

export interface NotificationPreferences {
  transaction: boolean;
  credit_line: boolean;
  risk_score: boolean;
  rate_change: boolean;
  system: boolean;
}
