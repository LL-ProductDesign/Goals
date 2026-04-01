import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal } from '../design-system/Modal';
import { Icon } from '../design-system/Icon';

// ─── Types ────────────────────────────────────────────────────────────────────

type SkillId = 'listening' | 'speaking' | 'reading' | 'writing';

interface Skill {
  id: SkillId;
  label: string;
  description: string;
  icon: string;
}

export interface SetGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (orderedSkills: SkillId[]) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_SKILLS: Skill[] = [
  { id: 'listening', label: 'Listening',  description: 'Enhance comprehension of native speakers',          icon: 'listening'      },
  { id: 'speaking',  label: 'Speaking',   description: 'Improve conversational fluency and pronunciation',  icon: 'head-side-speak' },
  { id: 'reading',   label: 'Reading',    description: 'Build vocabulary and reading comprehension',        icon: 'learning-guide' },
  { id: 'writing',   label: 'Writing',    description: 'Develop grammar and written expression',            icon: 'pen'            },
];

const ORDINALS = ['1ST', '2ND', '3RD', '4TH'];

// ─── Component ────────────────────────────────────────────────────────────────

/** Set Learning Goals modal with SortableJS-powered skill prioritisation */
export function SetGoalsModal({ isOpen, onClose, onContinue }: SetGoalsModalProps) {
  const [skills, setSkills]         = useState<Skill[]>(DEFAULT_SKILLS);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      {/* SortableJS animation styles */}
      <style>{`
        .skill-ghost {
          opacity: 0.3;
          background: var(--background-blue-light) !important;
          border: 2px dashed var(--border-color-brand) !important;
        }
        .skill-drag {
          opacity: 1;
          box-shadow: 0 8px 24px rgba(9, 30, 66, 0.2) !important;
          transform: scale(1.02);
          cursor: grabbing !important;
          z-index: 9999;
        }
        .skill-item {
          transition: transform 0.2s ease;
        }
      `}</style>

      <Modal
        isOpen={isOpen}
        title="Set Learning Goals"
        primaryLabel="Continue"
        secondaryLabel="Cancel"
        onClose={onClose}
        onSecondary={onClose}
        onPrimary={() => onContinue?.(skills.map(s => s.id))}
        maxWidth={580}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)' }}>

          {/* Instruction text */}
          <p style={{
            margin:     0,
            fontFamily: 'var(--font-family-base)',
            fontSize:   'var(--font-size-default)',
            fontWeight: 'var(--font-weight-regular)',
            lineHeight: 'var(--line-height-default)',
            color:      'var(--text-primary)',
          }}>
            Drag the skills in order of what you most want to improve.<br />
            Your #1 priority will receive the most focus in your personalized learning path.
          </p>

          {/* Sortable skill list */}
          <ReactSortable
            list={skills}
            setList={setSkills}
            animation={150}
            ghostClass="skill-ghost"
            dragClass="skill-drag"
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {skills.map((skill, index) => {
              const isFirst   = index === 0;
              const isHovered = hoverIndex === index;

              return (
                <div
                  key={skill.id}
                  className="skill-item"
                  style={{ position: 'relative', paddingTop: 13 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Priority badge */}
                  <div style={{
                    position:        'absolute',
                    top:             0,
                    right:           0,
                    display:         'inline-flex',
                    alignItems:      'center',
                    padding:         '4px 8px',
                    borderRadius:    'var(--border-radius-tags)',
                    backgroundColor: isFirst ? 'var(--blue-100)' : 'var(--neutral-20)',
                    border:          isFirst ? 'none' : '1px solid var(--neutral-30)',
                    zIndex:          1,
                  }}>
                    <span style={{
                      fontFamily:    'var(--font-family-base)',
                      fontSize:      'var(--font-size-extra-extra-small)',
                      fontWeight:    'var(--font-weight-semibold)',
                      lineHeight:    'var(--line-height-extra-extra-small)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      color:         isFirst ? 'var(--text-brand)' : 'var(--text-secondary)',
                      whiteSpace:    'nowrap',
                    }}>
                      {ORDINALS[index]} priority
                    </span>
                  </div>

                  {/* Skill card */}
                  <div style={{
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'space-between',
                    padding:         'var(--spacing-medium) var(--spacing-small) var(--spacing-medium) var(--spacing-medium)',
                    backgroundColor: isHovered ? 'var(--background-secondary)' : 'var(--background-primary)',
                    border:          '1px solid var(--border-color-primary)',
                    borderRadius:    'var(--border-radius-cards)',
                    boxShadow:       'var(--shadow-card)',
                    transition:      'background 0.15s',
                    userSelect:      'none',
                    cursor:          'grab',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium)' }}>
                      {/* Skill icon */}
                      <div style={{
                        display:         'flex',
                        alignItems:      'center',
                        padding:         'var(--spacing-extra-small)',
                        borderRadius:    'var(--border-radius-circle)',
                        backgroundColor: 'var(--blue-100)',
                        flexShrink:      0,
                      }}>
                        <Icon name={skill.icon} size={24} color="var(--text-brand)" />
                      </div>

                      {/* Label + description */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontFamily:  'var(--font-family-base)',
                          fontSize:    'var(--font-size-large)',
                          fontWeight:  'var(--font-weight-semibold)',
                          lineHeight:  'var(--line-height-large)',
                          color:       'var(--text-primary)',
                        }}>
                          {skill.label}
                        </span>
                        <span style={{
                          fontFamily:  'var(--font-family-base)',
                          fontSize:    'var(--font-size-default)',
                          fontWeight:  'var(--font-weight-regular)',
                          lineHeight:  'var(--line-height-default)',
                          color:       'var(--text-primary)',
                        }}>
                          {skill.description}
                        </span>
                      </div>
                    </div>

                    {/* Drag handle */}
                    <div
                      style={{
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        width:           36,
                        height:          29,
                        flexShrink:      0,
                      }}
                    >
                      <Icon
                        name="grip-vertical"
                        size={24}
                        color={isHovered ? 'var(--neutral-200)' : 'var(--neutral-70)'}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </ReactSortable>

        </div>
      </Modal>
    </>
  );
}
