import React, { useEffect, useState } from 'react';
import { color, shadow, radius } from '../design-system/tokens';
import { LearnlightButton } from '../design-system/LearnlightButton';

function ArrowLeftIcon({ size = 16, disabled }: { size?: number; disabled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 12L6 8l4-4" stroke={disabled ? color['text-disabled'] : color['text-brand']} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke={color['text-brand']} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimerBlock({ value }: { value: string }) {
  return (
    <div style={{
      background: color['bg-info'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: 4,
      width: 26,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: color['text-brand'],
    }}>
      {value}
    </div>
  );
}

function Separator() {
  return (
    <span style={{
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: color['text-brand'],
    }}>:</span>
  );
}

function useCountdown(initialMs: number) {
  const [remaining, setRemaining] = useState(initialMs);
  useEffect(() => {
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(remaining / 3_600_000)).padStart(2, '0');
  const m = String(Math.floor((remaining % 3_600_000) / 60_000)).padStart(2, '0');
  const s = String(Math.floor((remaining % 60_000) / 1000)).padStart(2, '0');
  return { h, m, s };
}

export function NextClassWidget() {
  const { h, m, s } = useCountdown(2 * 3_600_000 + 15 * 60_000 + 32_000);

  return (
    <div style={{
      background: color['bg-primary'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: radius['cards'],
      boxShadow: shadow['card'],
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
        paddingLeft: 16,
        paddingRight: 8,
        borderBottom: `1px solid ${color['border-primary']}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: color['text-primary'],
          }}>
            Next class
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TimerBlock value={h} />
            <Separator />
            <TimerBlock value={m} />
            <Separator />
            <TimerBlock value={s} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <button style={{ ...navBtnStyle, opacity: 0.4 }} disabled aria-label="Previous class">
            <ArrowLeftIcon size={16} disabled />
          </button>
          <button style={navBtnStyle} aria-label="Next class">
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: color['text-primary'],
          lineHeight: '28px',
          margin: 0,
        }}>
          Tuesday, 11 November at 11:30
        </p>
        <LearnlightButton
          variant="secondary"
          size="m"
          text="View class details"
          leftIcon
          selectIconLeft={<ArrowRightIcon size={14} />}
        />
      </div>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  background: 'none',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};
