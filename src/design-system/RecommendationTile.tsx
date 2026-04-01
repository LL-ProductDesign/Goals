import React from 'react';
import { LearnlightButton } from './LearnlightButton';
import { Illustration } from './Illustration';
import type { IllustrationName } from './Illustration';
import { Icon } from './Icon';
import { color, radius, shadow, spacingScale } from './tokens';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface RecommendationTileProps {
  /** Card heading text */
  cardTitle?: string;
  /** Supporting description shown below the title */
  cardDescription?: string;
  /** Secondary info line (e.g. estimated time) */
  cardInfo?: string;
  /** Show the primary CTA button */
  cta?: boolean;
  /** Show the secondary action button */
  secondaryAction?: boolean;
  /** Layout breakpoint — affects width, illustration size and font sizes */
  device?: 'desktop' | 'mobile';
  /** Completion state — done renders a strikethrough title and faded illustration */
  state?: 'default' | 'done';
  /** Which illustration to display */
  illustrationName?: IllustrationName;
  /** Called when the primary CTA button is clicked */
  onCta?: () => void;
  /** Called when the secondary action button is clicked */
  onSecondaryAction?: () => void;
  /** Custom label for the primary CTA button */
  ctaLabel?: string;
  /** Custom label for the secondary action button */
  secondaryLabel?: string;
  style?: React.CSSProperties;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const FONT_FAMILY = "'Fira Sans', sans-serif";

// ─── Component ──────────────────────────────────────────────────────────────

/** Learnlight Design System — Recommendation Tile */
export function RecommendationTile({
  cardTitle = 'Complete your assessment',
  cardDescription = 'You have a pending assessment that needs your immediate attention',
  cardInfo = 'Estimated time: up to 15 minutes',
  cta = true,
  secondaryAction = false,
  device = 'desktop',
  state = 'default',
  illustrationName = 'recommendation-assessment',
  onCta,
  onSecondaryAction,
  ctaLabel = 'Complete Assessment',
  secondaryLabel = 'Schedule session',
  style,
}: RecommendationTileProps) {
  const isDefault = state === 'default';
  const isDesktop = device === 'desktop';
  const isMobile = device === 'mobile';

  const illustrationSize = isDesktop ? 180 : 120;

  // ── Card container ──────────────────────────────────────────────────────
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    borderRadius: radius.cards,
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    width: isMobile ? 336 : 1024,
    ...(isDefault
      ? {
          backgroundColor: color['bg-primary'],
          border: `1px solid ${color['border-primary']}`,
          boxShadow: shadow.card,
          ...(isDesktop
            ? {
                height: 196,
                paddingLeft: spacingScale.sm,
                paddingTop: spacingScale.md,
                paddingBottom: spacingScale.md,
                justifyContent: 'center',
              }
            : {
                gap: spacingScale.xs,
                padding: spacingScale.sm,
              }),
        }
      : {
          backgroundColor: color['bg-info'],
          ...(isDesktop
            ? {
                height: 116,
                paddingLeft: spacingScale.sm,
                paddingTop: spacingScale.xs,
                paddingBottom: spacingScale.xs,
              }
            : {
                gap: spacingScale.xs,
                padding: spacingScale.sm,
              }),
        }),
    ...style,
  };

  // ── Illustration wrapper — clips to correct height in done state ────────
  const doneIllustrationHeight = isDesktop ? 100 : 67;
  const illustrationWrapperStyle: React.CSSProperties = {
    position: 'relative',
    flexShrink: 0,
    width: illustrationSize,
    ...(!isDefault && { height: doneIllustrationHeight, overflow: 'hidden' }),
  };

  return (
    <div style={cardStyle}>
      {/* ── Illustration ─────────────────────────────────────────────────── */}
      <div style={illustrationWrapperStyle}>
        <Illustration
          name={illustrationName}
          style={{
            width: illustrationSize,
            height: illustrationSize,
            opacity: isDefault ? 1 : 0.4,
            flexShrink: 0,
          }}
        />
        {!isDefault && (
          <div style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <Icon name="good" size={32} color="var(--background-brand)" />
          </div>
        )}
      </div>

      {/* ── Default state: full content ──────────────────────────────────── */}
      {isDefault && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacingScale.md,
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            ...(isDesktop
              ? { flex: '1 0 0', minHeight: 1, minWidth: 1, paddingLeft: spacingScale.md, paddingRight: spacingScale.md }
              : { flexShrink: 0, width: '100%' }),
          }}
        >
          {/* Title + description + info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacingScale.xs,
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: isDesktop ? 24 : 20,
                fontWeight: 600,
                lineHeight: '32px',
                color: color['text-primary'],
                margin: 0,
                width: '100%',
              }}
            >
              {cardTitle}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacingScale['2xs'],
                width: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: isDesktop ? 16 : 14,
                  fontWeight: 400,
                  lineHeight: isDesktop ? '22px' : '18px',
                  color: color['text-primary'],
                  margin: 0,
                }}
              >
                {cardDescription}
              </p>
              <p
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '16px',
                  color: color['text-secondary'],
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {cardInfo}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexShrink: 0,
              ...(isMobile && { width: '100%' }),
            }}
          >
            {cta && (
              <div style={isMobile ? { flex: '1 0 0', display: 'grid' } : undefined}>
                <LearnlightButton
                  variant="primary"
                  size="m"
                  text={ctaLabel}
                  onClick={onCta}
                />
              </div>
            )}
            {secondaryAction && (
              <div style={isMobile ? { flex: '1 0 0', display: 'grid' } : undefined}>
                <LearnlightButton
                  variant="secondary"
                  size="m"
                  text={secondaryLabel}
                  onClick={onSecondaryAction}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Done state: strikethrough title only ─────────────────────────── */}
      {!isDefault && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            ...(isDesktop
              ? { flex: '1 0 0', minHeight: 1, minWidth: 1, paddingLeft: spacingScale.md }
              : { flexShrink: 0, width: '100%' }),
          }}
        >
          <p
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: isDesktop ? 24 : 20,
              fontWeight: 600,
              lineHeight: '32px',
              color: color['text-secondary'],
              textDecoration: 'line-through',
              textDecorationSkipInk: 'none',
              margin: 0,
              flex: '1 0 0',
              width: '100%',
            }}
          >
            {cardTitle}
          </p>
        </div>
      )}
    </div>
  );
}
