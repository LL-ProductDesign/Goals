import { useEffect, useRef, useState } from 'react';
import { color, scale, shadow, radius } from '../design-system/tokens';
import { UnderlineTabs } from '../design-system/UnderlineTabs';
import { LearnlightButton } from '../design-system/LearnlightButton';
import { useBreakpoint } from '../design-system/useBreakpoint';

// ─── Types ────────────────────────────────────────────────────────────────────

type TagVariant = 'error' | 'warning' | 'info';
type TabId = 'all' | 'unread';

interface Notification {
  id: string;
  tagVariant: TagVariant;
  tagLabel: string;
  timestamp: string;
  body: string;
  actionLabel: string;
  unread: boolean;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    tagVariant: 'error',
    tagLabel: '6 classes to schedule',
    timestamp: '13:51',
    body: 'You have 6 more classes to schedule! Make sure you find the best trainer by scheduling ahead!',
    actionLabel: 'Schedule class',
    unread: true,
  },
  {
    id: '2',
    tagVariant: 'warning',
    tagLabel: 'Class cancelled',
    timestamp: '2h ago',
    body: 'Your class on Tuesday, 13 January at 13:30 was cancelled by your trainer.',
    actionLabel: 'View class details',
    unread: true,
  },
  {
    id: '3',
    tagVariant: 'warning',
    tagLabel: 'Favorite trainer booking fast',
    timestamp: 'Yesterday',
    body: 'Your favorite trainer will be fully booked soon! Schedule your remaining classes now!',
    actionLabel: 'View calendar',
    unread: false,
  },
  {
    id: '4',
    tagVariant: 'warning',
    tagLabel: 'Session in 2 days',
    timestamp: 'Thu 13:20',
    body: "You have a session in 2 days. Can you make it? Make sure you avoid being marked as absent, if cancelling too late.",
    actionLabel: 'View class details',
    unread: false,
  },
  {
    id: '5',
    tagVariant: 'info',
    tagLabel: 'Share your feedback',
    timestamp: 'Sun 08/01',
    body: "Help us improve! Answer a couple of questions about the platform and you'll make our day better!",
    actionLabel: 'Access survey',
    unread: false,
  },
  {
    id: '6',
    tagVariant: 'error',
    tagLabel: 'New message from tutor',
    timestamp: '24/12/2025',
    body: 'You have a new message from your tutor. Check it now!',
    actionLabel: 'Access tutor support',
    unread: false,
  },
];

// ─── Tag styles per variant ───────────────────────────────────────────────────

const TAG_STYLES: Record<TagVariant, { bg: string; border: string; textColor: string }> = {
  error: {
    bg: color['bg-error'],
    border: color['bg-red-light'],
    textColor: color['text-error'],
  },
  warning: {
    bg: color['bg-warning'],
    border: scale.orange[50],
    textColor: color['text-warning'],
  },
  info: {
    bg: color['bg-info'],
    border: color['bg-blue-light'],
    textColor: color['text-brand'],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function UnreadDot() {
  return (
    <span style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color['text-brand'],
      flexShrink: 0,
      display: 'inline-block',
    }} />
  );
}

function Tag({ variant, label }: { variant: TagVariant; label: string }) {
  const s = TAG_STYLES[variant];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 22,
      padding: '4px 8px',
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: radius['interactive'],
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        color: s.textColor,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        lineHeight: '14px',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

function NotificationItem({
  item,
  onMarkRead,
}: {
  item: Notification;
  onMarkRead: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bgDefault = item.unread ? color['bg-blue-light'] : color['bg-primary'];
  const bgHover   = item.unread ? scale.blue[100] : color['bg-secondary'];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onMarkRead(item.id)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 12,
        background: hovered ? bgHover : bgDefault,
        borderTop: '1px solid ' + color['border-primary'],
        transition: 'background 0.12s',
        cursor: 'pointer',
      }}
    >
      {/* Top row: dot + tag + timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {item.unread && <UnreadDot />}
          <Tag variant={item.tagVariant} label={item.tagLabel} />
        </div>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: color['text-secondary'],
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          lineHeight: '14px',
          paddingLeft: 8,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {item.timestamp}
        </span>
      </div>

      {/* Body */}
      <p style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 14,
        fontWeight: item.unread ? 600 : 400,
        color: color['text-primary'],
        lineHeight: '18px',
        margin: 0,
      }}>
        {item.body}
      </p>

      {/* Action */}
      <button
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          height: 24,
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: color['text-brand'],
          cursor: 'pointer',
          textTransform: 'capitalize',
          lineHeight: '18px',
          alignSelf: 'flex-start',
        }}
      >
        {item.actionLabel}
      </button>
    </div>
  );
}

// ─── Shared panel content ─────────────────────────────────────────────────────

function PanelContent({
  activeTab,
  setActiveTab,
  filtered,
  markAllRead,
  markRead,
}: {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  filtered: Notification[];
  markAllRead: () => void;
  markRead: (id: string) => void;
}) {
  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: color['text-primary'],
          lineHeight: '22px',
        }}>
          Notifications
        </span>
      </div>

      {/* Tabs + Mark all read */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 8,
        flexShrink: 0,
      }}>
        <UnderlineTabs
          tabs={[
            { id: 'all',    label: 'All' },
            { id: 'unread', label: 'Unread' },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />
        <LearnlightButton
          variant="txt"
          size="s"
          text="Mark all read"
          onClick={markAllRead}
        />
      </div>

      {/* Notification list */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: 32,
            textAlign: 'center',
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 14,
            color: color['text-secondary'],
          }}>
            No notifications
          </div>
        ) : (
          filtered.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onMarkRead={markRead}
            />
          ))
        )}
      </div>
    </>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

interface NotificationPanelProps {
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
  panelWidth?: number | string;
}

export function NotificationPanel({ onClose, onUnreadCountChange }: NotificationPanelProps) {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';

  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Slide-in animation on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Click-outside to close (desktop/tablet only — mobile uses backdrop)
  useEffect(() => {
    if (isMobile) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose, isMobile]);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isMobile]);

  // Notify parent of unread count changes
  useEffect(() => {
    const count = notifications.filter(n => n.unread).length;
    onUnreadCountChange?.(count);
  }, [notifications, onUnreadCountChange]);

  function markAllRead() {
    setNotifications(ns => ns.map(n => ({ ...n, unread: false })));
  }

  function markRead(id: string) {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));
  }

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread;
    return true;
  });

  // ── Mobile: bottom sheet ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 30, 66, 0.5)',
            zIndex: 199,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />

        {/* Sheet */}
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: '85vh',
            background: color['bg-primary'],
            borderRadius: '16px 16px 0 0',
            boxShadow: shadow['modal'],
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 200,
            transform: visible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {/* Drag handle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 0 4px',
            flexShrink: 0,
          }}>
            <div style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              background: color['border-primary'],
            }} />
          </div>

          <PanelContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filtered={filtered}
            markAllRead={markAllRead}
            markRead={markRead}
          />
        </div>
      </>
    );
  }

  // ── Desktop / Tablet: dropdown ────────────────────────────────────────────
  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: 420,
        maxHeight: 600,
        background: color['bg-primary'],
        border: `1px solid ${color['border-primary']}`,
        borderRadius: radius['cards'],
        boxShadow: shadow['modal'],
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 200,
      }}
    >
      <PanelContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filtered={filtered}
        markAllRead={markAllRead}
        markRead={markRead}
      />
    </div>
  );
}
