import { useState } from 'react';
import { Icon } from '../design-system/Icon';
import { LearnlightButton } from '../design-system/LearnlightButton';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Topic {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ChooseTopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSave: (topics: string[]) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_TOPICS = 3;

const TOPICS: Topic[] = [
  { id: 'business',     label: 'Business & Professional', description: 'Master workplace communication and business terminology',  icon: 'briefcase'     },
  { id: 'travel',       label: 'Travel & Tourism',        description: 'Navigate confidently in Spanish-speaking countries',       icon: 'plane'         },
  { id: 'culture',      label: 'Culture & Traditions',    description: 'Explore Hispanic culture and customs',                     icon: 'landmark'      },
  { id: 'conversation', label: 'Daily Conversation',      description: 'Improve everyday communication skills',                    icon: 'comment-lines' },
  { id: 'news',         label: 'News & Traditions',       description: 'Discuss contemporary topics and global issues',            icon: 'newspaper'     },
  { id: 'technology',   label: 'Technology & Innovation', description: 'Learn tech vocabulary and digital communication',          icon: 'robot'         },
  { id: 'arts',         label: 'Arts & Literature',       description: 'Explore Spanish literature and artistic expressions',      icon: 'paintbrush'    },
  { id: 'health',       label: 'Health & Wellness',       description: 'Discuss health, fitness, and medical topics',             icon: 'spa'           },
];

// ─── Component ────────────────────────────────────────────────────────────────

/** Step 2 of the Set Goals flow — topic selection */
export function ChooseTopicsModal({ isOpen, onClose, onBack, onSave }: ChooseTopicsModalProps) {
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [hovered, setHovered]     = useState<string | null>(null);

  if (!isOpen) return null;

  function toggleTopic(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_TOPICS) {
        next.add(id);
      }
      return next;
    });
  }

  const selectedCount = selected.size;

  const footerText =
    selectedCount === 0 ? 'No topics selected yet' :
    selectedCount === 1 ? '1 topic selected' :
    `${selectedCount} topics selected`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose Topics"
      style={{
        position:        'fixed',
        inset:           0,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: 'rgba(9, 30, 66, 0.32)',
        zIndex:          1000,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background:     'var(--background-primary)',
        borderRadius:   'var(--border-radius-cards)',
        boxShadow:      'var(--shadow-modal)',
        width:          '100%',
        maxWidth:       798,
        maxHeight:      '90vh',
        display:        'flex',
        flexDirection:  'column',
        overflow:       'hidden',
      }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          paddingLeft:   'var(--spacing-medium)',
          paddingRight:  'var(--spacing-small)',
          paddingTop:    'var(--spacing-small)',
          paddingBottom: 'var(--spacing-small)',
          flexShrink:    0,
        }}>
          <span style={{
            flex:       1,
            fontFamily: 'var(--font-family-base)',
            fontSize:   'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 'var(--line-height-h2)',
            color:      'var(--text-primary)',
          }}>
            Choose Your Learning Focus
          </span>
          <LearnlightButton
            variant="txt_grey"
            size="m"
            content="icon_only"
            selectIconLeft={<Icon name="close" size={16} />}
            leftIcon
            aria-label="Close modal"
            onClick={onClose}
          />
        </div>

        {/* ── Scrollable body ──────────────────────────────────────────────── */}
        <div style={{
          flex:          1,
          overflowY:     'auto',
          display:       'flex',
          flexDirection: 'column',
          gap:           'var(--spacing-large)',
          padding:       'var(--spacing-extra-small) var(--spacing-medium)',
        }}>

          {/* Subtitle */}
          <p style={{
            margin:     0,
            fontFamily: 'var(--font-family-base)',
            fontSize:   'var(--font-size-default)',
            fontWeight: 'var(--font-weight-regular)',
            lineHeight: 'var(--line-height-default)',
            color:      'var(--text-primary)',
          }}>
            {'Select your '}
            <strong style={{ fontWeight: 'var(--font-weight-semibold)' }}>top {MAX_TOPICS} topics</strong>
            {' of interest '}
            <span style={{ color: 'var(--text-error)' }}>to personalize your activity library.</span>
          </p>

          {/* Topic grid — 2 columns */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'var(--spacing-extra-small)',
          }}>
            {TOPICS.map(topic => {
              const isSelected = selected.has(topic.id);
              const isAtMax    = !isSelected && selectedCount >= MAX_TOPICS;

              return (
                <div
                  key={topic.id}
                  role="checkbox"
                  aria-checked={isSelected}
                  onClick={() => !isAtMax && toggleTopic(topic.id)}
                  onMouseEnter={() => !isAtMax && setHovered(topic.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display:         'flex',
                    alignItems:      'center',
                    gap:             'var(--spacing-medium)',
                    paddingTop:      'var(--spacing-medium)',
                    paddingBottom:   'var(--spacing-medium)',
                    paddingLeft:     'var(--spacing-medium)',
                    paddingRight:    'var(--spacing-small)',
                    backgroundColor: isSelected
                      ? 'var(--background-blue-light)'
                      : hovered === topic.id
                        ? 'var(--background-secondary)'
                        : 'var(--background-primary)',
                    border:          isSelected
                      ? '1px solid var(--border-color-brand)'
                      : '1px solid var(--border-color-primary)',
                    borderRadius:    'var(--border-radius-cards)',
                    boxShadow:       'var(--shadow-card)',
                    cursor:          isAtMax ? 'default' : 'pointer',
                    opacity:         isAtMax ? 0.5 : 1,
                    transition:      'background 0.15s, border-color 0.15s, opacity 0.15s',
                    userSelect:      'none',
                  }}
                >
                  {/* Topic icon with selected checkmark badge */}
                  <div style={{
                    position:        'relative',
                    width:           40,
                    height:          40,
                    borderRadius:    'var(--border-radius-circle)',
                    backgroundColor: 'var(--blue-100)',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    flexShrink:      0,
                  }}>
                    <Icon name={topic.icon} size={24} color="var(--text-brand)" />
                    {isSelected && (
                      <div style={{ position: 'absolute', top: -4, right: -4 }}>
                        <Icon name="good" size={16} color="var(--background-brand)" />
                      </div>
                    )}
                  </div>

                  {/* Label + description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize:   'var(--font-size-large)',
                      fontWeight: 'var(--font-weight-semibold)',
                      lineHeight: 'var(--line-height-large)',
                      color:      'var(--text-primary)',
                    }}>
                      {topic.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize:   'var(--font-size-default)',
                      fontWeight: 'var(--font-weight-regular)',
                      lineHeight: 'var(--line-height-default)',
                      color:      'var(--text-primary)',
                    }}>
                      {topic.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        'var(--spacing-medium)',
          flexShrink:     0,
        }}>
          <span style={{
            flex:       1,
            fontFamily: 'var(--font-family-base)',
            fontSize:   'var(--font-size-default)',
            fontWeight: 'var(--font-weight-regular)',
            lineHeight: 'var(--line-height-default)',
            color:      'var(--text-secondary)',
          }}>
            {footerText}
          </span>
          <div style={{ display: 'flex', gap: 'var(--spacing-extra-small)' }}>
            <LearnlightButton variant="txt" size="m" text="Back" onClick={onBack} />
            <LearnlightButton
              variant="primary"
              size="m"
              text="Save Goals"
              isDisabled={selectedCount === 0}
              onClick={() => onSave([...selected])}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
