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
        title="Set Your Learning Goals"
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
            Drag and reorder the skills based on what you want to improve most. Your top priority will get the most focus in your personalized learning path.
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
                    <svg
                      width="36" height="28.57"
                      viewBox="0 0 36 28.5714"
                      fill="none"
                      style={{ flexShrink: 0, color: isHovered ? 'var(--neutral-200)' : 'var(--neutral-70)' }}
                    >
                      <path d="M17.7139 25.1426C18.6606 25.1426 19.4287 25.9106 19.4287 26.8574C19.4285 27.804 18.6605 28.5713 17.7139 28.5713C16.7674 28.5711 16.0002 27.8039 16 26.8574C16 25.9108 16.7673 25.1428 17.7139 25.1426ZM26.2861 25.1426C27.2327 25.1428 28 25.9108 28 26.8574C27.9998 27.8039 27.2326 28.5711 26.2861 28.5713C25.3395 28.5713 24.5715 27.804 24.5713 26.8574C24.5713 25.9106 25.3394 25.1426 26.2861 25.1426ZM17.7139 16.5713C18.6605 16.5713 19.4285 17.3386 19.4287 18.2852C19.4287 19.2319 18.6606 20 17.7139 20C16.7673 19.9998 16 19.2318 16 18.2852C16.0002 17.3387 16.7674 16.5715 17.7139 16.5713ZM26.2861 16.5713C27.2326 16.5715 27.9998 17.3387 28 18.2852C28 19.2318 27.2327 19.9998 26.2861 20C25.3394 20 24.5713 19.2319 24.5713 18.2852C24.5715 17.3386 25.3395 16.5713 26.2861 16.5713ZM17.7139 8C18.6605 8 19.4285 8.76729 19.4287 9.71387C19.4287 10.6606 18.6606 11.4287 17.7139 11.4287C16.7673 11.4285 16 10.6605 16 9.71387C16.0002 8.76743 16.7674 8.00023 17.7139 8ZM26.2861 8C27.2326 8.00023 27.9998 8.76738 28 9.71387C28 10.6605 27.2327 11.4285 26.2861 11.4287C25.3394 11.4287 24.5713 10.6606 24.5713 9.71387C24.5715 8.76724 25.3395 8 26.2861 8Z" fill="currentColor"/>
                    </svg>
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
