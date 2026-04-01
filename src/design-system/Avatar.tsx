import React from 'react';

export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline' | 'none';

export interface AvatarProps {
  /**
   * Image URL. When provided, the image is displayed.
   */
  src?: string;

  /**
   * Alt text for the image.
   */
  alt?: string;

  /**
   * Initials (1–2 characters) shown when no image is provided.
   */
  initials?: string;

  /**
   * Size of the avatar.
   * @default 'm'
   */
  size?: AvatarSize;

  /**
   * Status indicator shown as a small dot in the bottom-right corner.
   * @default 'none'
   */
  status?: AvatarStatus;

  /**
   * Custom icon node shown as fallback when no image or initials are provided.
   */
  icon?: React.ReactNode;
}

const SIZES: Record<AvatarSize, {
  box: number; font: number; icon: number;
  indicator: number; indicatorOffset: number;
}> = {
  xs: { box: 24, font: 10, icon: 12, indicator: 7,  indicatorOffset: 0 },
  s:  { box: 32, font: 12, icon: 14, indicator: 8,  indicatorOffset: 1 },
  m:  { box: 40, font: 14, icon: 16, indicator: 10, indicatorOffset: 1 },
  l:  { box: 48, font: 16, icon: 20, indicator: 12, indicatorOffset: 2 },
  xl: { box: 64, font: 20, icon: 24, indicator: 14, indicatorOffset: 2 },
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online:  'var(--background-green)',
  away:    'var(--yellow-500)',
  busy:    'var(--text-error)',
  offline: 'var(--text-disabled)',
  none:    'transparent',
};

const DEFAULT_ICON = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'm',
  status = 'none',
  icon,
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);
  const dim = SIZES[size];

  const showImage = src && !imgError;
  const showInitials = !showImage && initials;
  const showIcon = !showImage && !showInitials;

  const bgColor = showInitials
    ? 'var(--background-brand)'
    : 'var(--background-secondary)';

  const textColor = showInitials
    ? 'var(--text-invert)'
    : 'var(--text-secondary)';

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexShrink: 0,
        width: dim.box,
        height: dim.box,
      }}
    >
      {/* Avatar circle */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: dim.box,
          height: dim.box,
          borderRadius: 'var(--border-radius-circle)',
          background: showImage ? 'transparent' : bgColor,
          color: textColor,
          fontFamily: 'var(--font-family-base)',
          fontSize: dim.font,
          fontWeight: 600,
          overflow: 'hidden',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {showImage && (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {showInitials && (
          <span style={{ lineHeight: 1 }}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
        {showIcon && (icon ?? DEFAULT_ICON(dim.icon))}
      </span>

      {/* Status indicator */}
      {status !== 'none' && (
        <span
          style={{
            position: 'absolute',
            bottom: dim.indicatorOffset,
            right: dim.indicatorOffset,
            width: dim.indicator,
            height: dim.indicator,
            borderRadius: '50%',
            background: STATUS_COLORS[status],
            border: `2px solid var(--background-primary)`,
            boxSizing: 'border-box',
          }}
        />
      )}
    </span>
  );
}
