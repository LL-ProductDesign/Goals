import { color, shadow, radius } from '../design-system/tokens';

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        color: color['text-secondary'],
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        lineHeight: '14px',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        color: color['text-primary'],
        lineHeight: '18px',
      }}>
        {value}
      </span>
    </div>
  );
}

export function ProgramDetailsWidget() {
  return (
    <div style={{
      flex: 1,
      background: color['bg-primary'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: radius['cards'],
      boxShadow: shadow['card'],
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${color['border-primary']}`,
      }}>
        <span style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: color['text-primary'],
        }}>
          Your Program Details
        </span>
      </div>

      <div style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}>
        <DetailRow label="Program" value="English" />

        <div style={{ display: 'flex', gap: 16 }}>
          <DetailRow label="Active from" value="01 September 2024" />
          <DetailRow label="Active until" value="01 June 2025" />
        </div>

        <DetailRow label="Assigned course" value="B1 - Intermediate 1" />
        <DetailRow label="Total class hours" value="30" />

        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: color['text-primary'],
          lineHeight: '20px',
          margin: 0,
        }}>
          Learn more about your homepage and the platform by reviewing this{' '}
          <a href="#" style={{ color: color['text-brand'] }}>tutorial</a>{' '}
          and <a href="#" style={{ color: color['text-brand'] }}>orientation video</a>.
        </p>

        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: color['text-primary'],
          lineHeight: '20px',
          margin: 0,
        }}>
          View your <a href="#" style={{ color: color['text-brand'] }}>learning objectives</a>{' '}
          and your <a href="#" style={{ color: color['text-brand'] }}>tutor support messages</a>.
        </p>
      </div>
    </div>
  );
}
