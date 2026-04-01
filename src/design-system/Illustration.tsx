import React from 'react';

// ─── Asset imports (raw SVG strings — same pattern as Icons.tsx) ────────────
import noNotificationsBg  from '../assets/illustrations/no-notifications-bg.svg?raw';
import noNotifications    from '../assets/illustrations/no-notifications.svg?raw';
import allDoneBg          from '../assets/illustrations/all-done-bg.svg?raw';
import allDone            from '../assets/illustrations/all-done.svg?raw';
import noRecommendationsBg from '../assets/illustrations/no-recommendations-bg.svg?raw';
import noRecommendations  from '../assets/illustrations/no-recommendations.svg?raw';
import certificatesBg     from '../assets/illustrations/certificates-bg.svg?raw';
import certificates       from '../assets/illustrations/certificates.svg?raw';
import recommendationBg   from '../assets/illustrations/recommendation-bg.svg?raw';
import recommendationAssessment from '../assets/illustrations/recommendation-assessment.svg?raw';
import recommendationGoal       from '../assets/illustrations/recommendation-goal.svg?raw';
import noDataBg           from '../assets/illustrations/no-data-bg.svg?raw';
import noData             from '../assets/illustrations/no-data-v1.svg?raw';

// ─── Types ─────────────────────────────────────────────────────────────────

/**
 * Available illustration names.
 *
 * - `no-notifications`          — Empty mailbox; use for empty notification lists.
 * - `all-done`                  — Two people celebrating; use for completed states.
 * - `no-recommendations`        — Person meditating; use when no recommendations exist.
 * - `certificates`              — Person holding a certificate; use on certificate pages.
 * - `recommendation-assessment` — Activity card thumbnail (assessment type).
 * - `no-data`                   — Person walking; use when no data is available.
 */
export type IllustrationName =
  | 'no-notifications'
  | 'all-done'
  | 'no-recommendations'
  | 'no-data'
  | 'certificates'
  | 'recommendation-assessment'
  | 'recommendation-goal';

export interface IllustrationProps {
  /** Which illustration to display. */
  name: IllustrationName;
  /** Accessible label. Defaults to the illustration name. Set to "" for purely decorative usage. */
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Layout config per illustration ────────────────────────────────────────

interface IllustrationConfig {
  width: number;
  height: number;
  bg: string;
  main: string;
  bgStyle: React.CSSProperties;
  mainStyle: React.CSSProperties;
}

const CONFIGS: Record<IllustrationName, IllustrationConfig> = {
  'no-notifications': {
    width: 320,
    height: 320,
    bg: noNotificationsBg,
    main: noNotifications,
    bgStyle: {
      position: 'absolute',
      top: '2.78%', right: '0', bottom: '9.44%', left: '0',
    },
    mainStyle: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 240, height: 195,
    },
  },

  'all-done': {
    width: 600,
    height: 400,
    bg: allDoneBg,
    main: allDone,
    bgStyle: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 477, height: 370,
      zIndex: 1,
    },
    mainStyle: {
      position: 'absolute',
      top: 0, left: '-2.97%', right: '-2.97%', bottom: 0,
      zIndex: 2,
    },
  },

  'no-recommendations': {
    width: 600,
    height: 400,
    bg: noRecommendationsBg,
    main: noRecommendations,
    bgStyle: {
      position: 'absolute',
      top: 23, left: 46,
      width: 483, height: 338,
      zIndex: 1,
    },
    mainStyle: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 538, height: 360,
      zIndex: 2,
    },
  },

  'certificates': {
    width: 320,
    height: 320,
    bg: certificatesBg,
    main: certificates,
    bgStyle: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%) rotate(-90deg)',
      width: 317, height: 264,
    },
    mainStyle: {
      position: 'absolute',
      top: '4.31%', right: '10.29%', bottom: '-0.01%', left: '10.28%',
    },
  },

  'no-data': {
    width: 600,
    height: 400,
    bg: noDataBg,
    main: noData,
    bgStyle: {
      position: 'absolute',
      left: 46, top: 23,
      width: 483, height: 338,
      zIndex: 1,
    },
    mainStyle: {
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 361, height: 378,
      zIndex: 2,
    },
  },

  'recommendation-assessment': {
    width: 180,
    height: 180,
    bg: recommendationBg,
    main: recommendationAssessment,
    bgStyle: {
      position: 'absolute',
      top: '6.67%', right: '4.44%', bottom: '13.33%', left: '4.44%',
    },
    mainStyle: {
      position: 'absolute',
      top: 0, right: '4.6%', bottom: 0, left: '2.9%',
    },
  },

  'recommendation-goal': {
    width: 180,
    height: 180,
    bg: recommendationBg,
    main: recommendationGoal,
    bgStyle: {
      position: 'absolute',
      top: '6.67%', right: '4.44%', bottom: '13.33%', left: '4.44%',
    },
    mainStyle: {
      position: 'absolute',
      top: 0, right: '4.6%', bottom: 0, left: '2.9%',
    },
  },
};

// ─── Inline SVG layer ───────────────────────────────────────────────────────

function SvgLayer({ svg, style }: { svg: string; style: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{ display: 'block', overflow: 'visible', ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

/** Learnlight Design System — Illustration */
export function Illustration({ name, alt, className, style }: IllustrationProps) {
  const cfg = CONFIGS[name];
  const label = alt !== undefined ? alt : name.replace(/-/g, ' ');

  return (
    <div
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      style={{
        position: 'relative',
        width: cfg.width,
        height: cfg.height,
        flexShrink: 0,
        overflow: 'visible',
        ...style,
      }}
    >
      <SvgLayer svg={cfg.bg}   style={cfg.bgStyle} />
      <SvgLayer svg={cfg.main} style={cfg.mainStyle} />
    </div>
  );
}
