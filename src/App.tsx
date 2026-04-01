import { useState } from 'react';
import { SetGoalsModal } from './components/SetGoalsModal';
import { ChooseTopicsModal } from './components/ChooseTopicsModal';
import { LearnlightButton } from './design-system/LearnlightButton';

function App() {
  const [goalsOpen, setGoalsOpen]   = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);

  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      gap:             16,
      backgroundColor: 'var(--background-secondary)',
    }}>
      <LearnlightButton onClick={() => setGoalsOpen(true)}>
        Set Learning Goals
      </LearnlightButton>
      <LearnlightButton variant="secondary" onClick={() => setTopicsOpen(true)}>
        Choose Topics
      </LearnlightButton>

      <SetGoalsModal
        isOpen={goalsOpen}
        onClose={() => setGoalsOpen(false)}
        onContinue={() => { setGoalsOpen(false); setTopicsOpen(true); }}
      />
      <ChooseTopicsModal
        isOpen={topicsOpen}
        onClose={() => setTopicsOpen(false)}
        onBack={() => { setTopicsOpen(false); setGoalsOpen(true); }}
        onSave={() => setTopicsOpen(false)}
      />
    </div>
  );
}

export default App;
