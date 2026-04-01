import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Label text */
  label: string;
  /** Disables interaction and dims the underline */
  disabled?: boolean;
  /** Numeric/string badge shown in a blue circle to the right of the label */
  counter?: number | string;
  /** Icon node. Position controlled by iconPosition */
  icon?: React.ReactNode;
  /** Whether the icon appears before or after the label. @default 'left' */
  iconPosition?: 'left' | 'right';
}

export interface UnderlineTabsProps {
  /** Tab definitions */
  tabs: TabItem[];
  /** ID of the currently active tab */
  activeId: string;
  /** Called with the tab ID when a tab is clicked */
  onChange: (id: string) => void;
  /**
   * When true, tabs share the available width equally (flex-stretch).
   * When false (default), tabs size to their content.
   */
  stretched?: boolean;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function Counter({ value }: { value: number | string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 16,
      height: 16,
      borderRadius: 999,
      background: 'var(--background-brand)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 9,
      fontWeight: 600,
      color: 'var(--text-invert)',
      lineHeight: 1,
    }}>
      {value}
    </span>
  );
}

interface TabBaseProps {
  item: TabItem;
  active: boolean;
  stretched: boolean;
  onClick: () => void;
}

function TabBase({ item, active, stretched, onClick }: TabBaseProps) {
  const [hovered, setHovered] = useState(false);

  const isDisabled = !!item.disabled;
  const showBg = hovered && !isDisabled;

  const textColor = (active || (hovered && active))
    ? 'var(--text-brand)'
    : isDisabled
      ? 'var(--text-disabled)'
      : 'var(--text-secondary)';

  const underlineColor = isDisabled
    ? 'var(--neutral-30)'
    : active
      ? 'var(--background-brand)'
      : 'var(--border-color-primary)';

  const hasIcon = !!item.icon;
  const iconLeft = hasIcon && (item.iconPosition ?? 'left') === 'left';
  const iconRight = hasIcon && item.iconPosition === 'right';

  return (
    <button
      role="tab"
      aria-selected={active}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        flex: stretched ? '1 0 0' : undefined,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        minWidth: 0,
      }}
    >
      {/* Tab pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: (hasIcon || item.counter != null) ? 4 : 0,
        padding: '4px 16px',
        borderRadius: 4,
        background: showBg ? 'var(--background-secondary)' : 'transparent',
        transition: 'background 0.12s',
      }}>
        {iconLeft && (
          <span style={{ display: 'inline-flex', width: 20, height: 20, color: textColor, flexShrink: 0 }}>
            {item.icon}
          </span>
        )}
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 14,
          fontWeight: 600,
          color: textColor,
          lineHeight: '18px',
          whiteSpace: 'nowrap',
          transition: 'color 0.12s',
        }}>
          {item.label}
        </span>
        {item.counter != null && <Counter value={item.counter} />}
        {iconRight && (
          <span style={{ display: 'inline-flex', width: 20, height: 20, color: textColor, flexShrink: 0 }}>
            {item.icon}
          </span>
        )}
      </div>

      {/* Underline */}
      <div style={{
        height: 2,
        width: '100%',
        borderRadius: 1,
        background: underlineColor,
        transition: 'background 0.12s',
        flexShrink: 0,
      }} />
    </button>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Learnlight Design System — Underline Tabs
 *
 * Tabs allow users to navigate between related views of content
 * while remaining in the context of the page.
 */
export function UnderlineTabs({ tabs, activeId, onChange, stretched = false }: UnderlineTabsProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 29,
        overflow: 'hidden',
        width: stretched ? '100%' : undefined,
      }}
    >
      {tabs.map(tab => (
        <TabBase
          key={tab.id}
          item={tab}
          active={tab.id === activeId}
          stretched={stretched}
          onClick={() => !tab.disabled && onChange(tab.id)}
        />
      ))}
    </div>
  );
}
