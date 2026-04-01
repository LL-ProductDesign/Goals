import { useState } from 'react';
import { color } from '../design-system/tokens';
import { useBreakpoint } from '../design-system/useBreakpoint';
import { Navbar } from './Navbar';
import { StatsBar } from './StatsBar';
import { RecommendationTile } from '../design-system/RecommendationTile';
import { NextClassWidget } from './NextClassWidget';
import { ProgramDetailsWidget } from './ProgramDetailsWidget';
import { SetGoalsModal } from './SetGoalsModal';
import { ChooseTopicsModal } from './ChooseTopicsModal';

export function HomePage() {
  const [notifCount, setNotifCount] = useState(2);
  const [panelOpen, setPanelOpen] = useState(false);
  const [goalsModalOpen, setGoalsModalOpen]   = useState(false);
  const [topicsModalOpen, setTopicsModalOpen] = useState(false);
  const [goalsDone, setGoalsDone]             = useState(false);
  const [goalsDismissed, setGoalsDismissed]   = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const isDesktop = bp === 'desktop';

  return (
    <div style={{
      minHeight: '100vh',
      background: color['bg-secondary'],
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Fira Sans', sans-serif",
    }}>
      <Navbar
        notificationCount={notifCount}
        onNotificationClick={() => setPanelOpen(o => !o)}
        notificationPanelOpen={panelOpen}
        onNotificationClose={() => setPanelOpen(false)}
        onUnreadCountChange={setNotifCount}
      />

      <main style={{
        flex: 1,
        maxWidth: 1312,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        paddingBottom: 16,
      }}>
        {/* Welcome header row */}
        <div style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          padding: isMobile ? `16px 12px 8px` : bp === 'tablet' ? '24px 16px 16px' : '24px 0',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 0 : 16,
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 26,
              fontWeight: 600,
              color: color['text-primary'],
              margin: 0,
              lineHeight: '40px',
            }}>
              Welcome, Alex!
            </h1>
            <p style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: color['text-primary'],
              margin: 0,
              lineHeight: '24px',
            }}>
              You have new items to complete today, selected specifically for you
            </p>
          </div>

          {!isMobile && <StatsBar />}
        </div>

        {/* Activity cards + right widgets area */}
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
          padding: isMobile ? '0 0 16px' : bp === 'tablet' ? '0 16px 16px' : '0 0 16px',
        }}>
          {/* Cards column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 16, minWidth: 0 }}>
            <RecommendationTile
              cardTitle="Prepare an upcoming class"
              cardDescription="Complete at least one of the activities prepared by your trainer for your class on Wednesday, 12 November at 13:30"
              ctaLabel="Prepare Class"
              device={isMobile ? 'mobile' : 'desktop'}
              style={{ width: '100%' }}
            />
            {!goalsDismissed && (
              <RecommendationTile
                cardTitle="Set Your Learning Goals and Topics"
                cardDescription="Set up your learning preferences for a personalized experience"
                  cta
                ctaLabel="Set Goals"
                ctaVariant="secondary"
                onCta={() => setGoalsModalOpen(true)}
                secondaryAction
                secondaryLabel="Dismiss"
                secondaryVariant="txt_grey"
                onSecondaryAction={() => setGoalsDismissed(true)}
                device={isMobile ? 'mobile' : 'desktop'}
                state={goalsDone ? 'done' : 'default'}
                illustrationName="recommendation-goal"
                style={{ width: '100%' }}
              />
            )}

            <SetGoalsModal
              isOpen={goalsModalOpen}
              onClose={() => setGoalsModalOpen(false)}
              onContinue={() => { setGoalsModalOpen(false); setTopicsModalOpen(true); }}
            />
            <ChooseTopicsModal
              isOpen={topicsModalOpen}
              onClose={() => setTopicsModalOpen(false)}
              onBack={() => { setTopicsModalOpen(false); setGoalsModalOpen(true); }}
              onSave={() => { setTopicsModalOpen(false); setGoalsDone(true); }}
            />
          </div>

          {/* Right widgets — desktop only */}
          {isDesktop && (
            <div style={{
              width: 312,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <NextClassWidget />
              <ProgramDetailsWidget />
            </div>
          )}
        </div>
      </main>

      {/* Footer — hidden on mobile */}
      {!isMobile && (
        <footer style={{
          borderTop: `1px solid ${color['border-primary']}`,
          padding: `12px ${bp === 'tablet' ? '16px' : '0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: color['bg-primary'],
          maxWidth: bp === 'tablet' ? undefined : 1312,
          width: '100%',
          margin: bp === 'tablet' ? undefined : '0 auto',
          boxSizing: 'border-box',
        }}>
          <span style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: 12,
            color: color['text-secondary'],
          }}>
            ©2025 Learning. All Rights Reserved
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-brand'], textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-brand'], textDecoration: 'none' }}>Cookies</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-secondary'] }}>
                🌐 EN ▾
              </span>
              <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: 12, color: color['text-secondary'] }}>
                Powered by: <strong style={{ color: color['text-brand'] }}>Learning</strong>
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
