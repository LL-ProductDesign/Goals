import React from 'react';
import { color, scale, shadow } from '../design-system/tokens';

interface StatCardProps {
  label: string;
  value: string;
  chart: React.ReactNode;
}

function StatCard({ label, value, chart }: StatCardProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
      height: 84,
      background: color['bg-primary'],
      border: `1px solid ${color['border-primary']}`,
      borderRadius: 8,
      padding: 12,
      boxShadow: shadow['card'],
      boxSizing: 'border-box',
    }}>
      <div>
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: color['text-secondary'],
          marginBottom: 4,
          marginTop: 0,
          lineHeight: 1,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: 24,
          fontWeight: 600,
          color: color['text-primary'],
          lineHeight: 1,
          margin: 0,
        }}>
          {value}
        </p>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {chart}
      </div>
    </div>
  );
}

// Course progress chart — one wide blue bar + 4 shorter bars
function ProgressBarChart() {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 3, height: 34 }}>
      {/* Wide blue bar */}
      <div style={{
        width: 80,
        height: 34,
        borderRadius: 4,
        background: color['bg-brand'],
        flexShrink: 0,
      }} />
      {/* Light blue bar */}
      <div style={{
        width: 10,
        height: 34,
        borderRadius: 4,
        background: scale.blue[100],
        flexShrink: 0,
      }} />
      {/* 3 yellow bars */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10,
          height: 34,
          borderRadius: 4,
          background: scale.yellow[100],
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

// Donut chart for average score — 60x60px
function DonutChart({ percent, color: chartColor }: { percent: number; color: string }) {
  const r = 22;
  const cx = 30;
  const cy = 30;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={60} height={60} viewBox="0 0 60 60">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color['border-primary']} strokeWidth={6} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={chartColor}
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

// Attendance chart — 60x60px donut
function AttendanceChart() {
  const percent = 44;
  const r = 22;
  const cx = 30;
  const cy = 30;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={60} height={60} viewBox="0 0 60 60">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color['border-primary']} strokeWidth={6} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color['text-brand']}
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

export function StatsBar() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <StatCard
        label="Course progress"
        value="55%"
        chart={<ProgressBarChart />}
      />
      <StatCard
        label="Average score"
        value="55%"
        chart={<DonutChart percent={55} color={color['text-brand']} />}
      />
      <StatCard
        label="Attendance"
        value="44%"
        chart={<AttendanceChart />}
      />
    </div>
  );
}
