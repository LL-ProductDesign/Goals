import React from 'react';
import { color, shadow } from '../design-system/tokens';
import { Icon } from '../design-system/Icon';
import { NotificationPanel } from './NotificationPanel';
import { useBreakpoint } from '../design-system/useBreakpoint';

function BellIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6z" />
      <path d="M10 18a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
    </svg>
  );
}


interface NavbarProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
  notificationPanelOpen?: boolean;
  onNotificationClose?: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export function Navbar({
  notificationCount = 2,
  onNotificationClick,
  notificationPanelOpen = false,
  onNotificationClose,
  onUnreadCountChange,
}: NavbarProps) {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const padding = isMobile ? '0 16px' : bp === 'tablet' ? '0 16px' : '0';

  const bellBadge = notificationCount > 0 && (
    <span style={{
      position: 'absolute',
      top: 4,
      right: 4,
      minWidth: 16,
      height: 16,
      borderRadius: 999,
      background: color['text-error'],
      color: color['text-invert'],
      fontSize: 10,
      fontWeight: 700,
      fontFamily: "'Fira Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1,
      padding: '0 3px',
      boxSizing: 'border-box',
      border: `2px solid ${color['bg-primary']}`,
    }}>
      {notificationCount}
    </span>
  );

  const bellButton = (
    <div style={{ position: 'relative' }}>
      <IconButton
        onClick={onNotificationClick}
        aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
        style={{ position: 'relative' }}
      >
        <BellIcon size={24} />
        {bellBadge}
      </IconButton>
      {notificationPanelOpen && onNotificationClose && (
        <NotificationPanel
          onClose={onNotificationClose}
          onUnreadCountChange={onUnreadCountChange}
        />
      )}
    </div>
  );

  const avatar = (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        background: color['bg-blue-light'],
        border: `1px solid ${color['border-primary']}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 16,
        fontWeight: 600,
        color: color['text-primary'],
        flexShrink: 0,
      }}>
        AL
      </div>
      {!isMobile && <Icon name="caret-down" size={12} color={color['text-primary']} />}
    </button>
  );

  const logo = (
    <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      <span style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: color['text-brand'],
        letterSpacing: -0.5,
      }}>
        Learning
      </span>
    </a>
  );

  return (
    <header style={{
      background: color['bg-primary'],
      boxShadow: shadow['page-header'],
      borderBottom: `2px solid ${color['border-primary']}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 60,
        maxWidth: 1312,
        width: '100%',
        margin: '0 auto',
        padding,
        boxSizing: 'border-box',
        gap: isMobile ? 0 : 24,
      }}>

        {isMobile ? (
          // Mobile layout: hamburger | logo (centered) | bell + avatar
          <>
            <div style={{ flex: 1 }}>
              <IconButton aria-label="Menu">
                <Icon name="menu-hamburger" size={24} color={color['text-primary']} />
              </IconButton>
            </div>
            {logo}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
              {bellButton}
              {avatar}
            </div>
          </>
        ) : (
          // Tablet + Desktop layout
          <>
            {logo}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
              {(['Study', 'Connect', 'Review'] as const).map(label => (
                <NavLink key={label} label={label} />
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: bp === 'tablet' ? 141 : 240,
                height: 40,
                padding: '0 12px',
                background: color['bg-primary'],
                border: `1px solid ${color['border-primary']}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: "'Fira Sans', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: color['text-primary'],
              }}>
                <span>English</span>
                <Icon name="caret-down" size={12} color={color['text-primary']} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconButton aria-label="Translate">
                  <Icon name="translator" size={24} color={color['text-primary']} />
                </IconButton>
                <IconButton aria-label="Settings">
                  <Icon name="settings" size={24} color={color['text-primary']} />
                </IconButton>
                {bellButton}
                {avatar}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 36,
      padding: '0 10px',
      background: 'none',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: 16,
      fontWeight: 400,
      color: color['text-primary'],
    }}>
      {label}
      <Icon name="caret-down" size={10} color={color['text-primary']} />
    </button>
  );
}

function IconButton({ children, style, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        minWidth: 40,
        height: 40,
        padding: 0,
        background: 'none',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        color: color['text-primary'],
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
