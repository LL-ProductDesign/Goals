import React from 'react';
import { color, shadow, radius } from '../design-system/tokens';
import { LearnlightButton } from '../design-system/LearnlightButton';
import { useBreakpoint } from '../design-system/useBreakpoint';

interface ActivityCardProps {
  illustration: React.ReactNode;
  illustrationMobile?: React.ReactNode;
  title: string;
  description: string;
  meta: string;
  buttonLabel: string;
  buttonVariant?: 'primary' | 'secondary';
  onAction?: () => void;
}

export function ActivityCard({
  illustration,
  illustrationMobile,
  title,
  description,
  meta,
  buttonLabel,
  buttonVariant = 'primary',
  onAction,
}: ActivityCardProps) {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';

  if (isMobile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: color['bg-primary'],
        border: `1px solid ${color['border-primary']}`,
        borderRadius: radius['cards'],
        boxShadow: shadow['card'],
        paddingTop: 12,
        paddingBottom: 12,
        boxSizing: 'border-box',
      }}>
        {/* Illustration */}
        <div style={{
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {illustrationMobile ?? illustration}
        </div>

        {/* Content */}
        <div style={{
          width: '100%',
          padding: '0 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          boxSizing: 'border-box',
        }}>
          <p style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: color['text-primary'],
            lineHeight: '32px',
            margin: 0,
          }}>
            {title}
          </p>
          <p style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: color['text-secondary'],
            lineHeight: '16px',
            margin: 0,
          }}>
            {meta}
          </p>
          <div style={{ marginTop: 4, display: 'flex' }}>
            <LearnlightButton
              variant={buttonVariant}
              size="s"
              text={buttonLabel}
              onClick={onAction}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: color['bg-primary'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: radius['cards'],
      boxShadow: shadow['card'],
      paddingLeft: 12,
      paddingTop: 16,
      paddingBottom: 16,
      boxSizing: 'border-box',
    }}>
      {/* Illustration panel */}
      <div style={{
        width: 180,
        height: 180,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {illustration}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        paddingLeft: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: color['text-primary'],
            lineHeight: '32px',
            margin: 0,
          }}>
            {title}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: color['text-primary'],
              lineHeight: '22px',
              margin: 0,
            }}>
              {description}
            </p>
            <p style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              color: color['text-secondary'],
              lineHeight: '16px',
              margin: 0,
            }}>
              {meta}
            </p>
          </div>
        </div>
        <div>
          <LearnlightButton
            variant={buttonVariant}
            size="m"
            text={buttonLabel}
            onClick={onAction}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Illustrations ────────────────────────────────────────────────────────────

export function PrepareClassIllustration() {
  return (
    <svg width={120} height={100} viewBox="0 0 120 100" fill="none">
      {/* Document */}
      <rect x="20" y="10" width="50" height="65" rx="4" fill={color['bg-blue-light']} stroke={color['border-primary']} strokeWidth="1.5" />
      <rect x="28" y="22" width="34" height="3" rx="1.5" fill={color['text-brand']} />
      <rect x="28" y="30" width="28" height="2" rx="1" fill={color['border-primary']} />
      <rect x="28" y="36" width="32" height="2" rx="1" fill={color['border-primary']} />
      <rect x="28" y="42" width="24" height="2" rx="1" fill={color['border-primary']} />
      {/* Person 1 */}
      <circle cx="82" cy="38" r="8" fill={color['bg-blue-light']} />
      <circle cx="82" cy="33" r="4" fill={color['text-brand']} />
      <path d="M74 52c0-4.4 3.6-8 8-8s8 3.6 8 8" fill={color['text-brand']} />
      {/* Person 2 */}
      <circle cx="98" cy="55" r="7" fill={color['bg-green-light']} />
      <circle cx="98" cy="50" r="3.5" fill={color['bg-green']} />
      <path d="M91.5 67c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" fill={color['bg-green']} />
    </svg>
  );
}

export function ReviewReportIllustration() {
  return (
    <svg width={120} height={100} viewBox="0 0 120 100" fill="none">
      {/* Clipboard */}
      <rect x="25" y="15" width="55" height="68" rx="4" fill="#f5f6f7" stroke={color['border-primary']} strokeWidth="1.5" />
      <rect x="38" y="10" width="29" height="12" rx="3" fill={color['border-primary']} />
      <rect x="33" y="28" width="39" height="3" rx="1.5" fill={color['border-primary']} />
      <rect x="33" y="35" width="39" height="3" rx="1.5" fill={color['border-primary']} />
      <rect x="33" y="42" width="30" height="3" rx="1.5" fill={color['text-brand']} opacity="0.5" />
      <rect x="33" y="49" width="39" height="3" rx="1.5" fill={color['border-primary']} />
      {/* Person */}
      <circle cx="92" cy="62" r="7" fill={color['bg-blue-light']} />
      <circle cx="92" cy="57" r="4" fill={color['text-brand']} />
      <path d="M85 74c0-3.9 3.1-7 7-7s7 3.1 7 7" fill={color['text-brand']} />
    </svg>
  );
}
