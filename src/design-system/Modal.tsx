import React from 'react';
import { LearnlightButton } from './LearnlightButton';
import { Icon } from './Icon';

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen?: boolean;
  /** Modal header title */
  title?: string;
  /** Body content */
  children?: React.ReactNode;
  /** Primary CTA button label */
  primaryLabel?: string;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Called when the close icon or backdrop is clicked */
  onClose?: () => void;
  /** Called when the primary CTA is clicked */
  onPrimary?: () => void;
  /** Called when the secondary button is clicked */
  onSecondary?: () => void;
  /** Override the default max-width (480px) */
  maxWidth?: number;
}

/** Learnlight Design System — Modal */
export function Modal({
  isOpen = true,
  title = 'Modal Title',
  children,
  primaryLabel = 'Main CTA',
  secondaryLabel = 'Secondary',
  onClose,
  onPrimary,
  onSecondary,
  maxWidth = 480,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(9, 30, 66, 0.32)',
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: 'var(--background-primary)',
          borderRadius: 'var(--border-radius-cards)',
          boxShadow: 'var(--shadow-modal)',
          width: '100%',
          maxWidth,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header — 56px total: py-12 + 32px content (button height) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'var(--spacing-medium)',
            paddingRight: 'var(--spacing-small)',
            paddingTop: 'var(--spacing-small)',
            paddingBottom: 'var(--spacing-small)',
          }}
        >
          <span
            style={{
              flex: 1,
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-h2)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-h2)',
              color: 'var(--text-primary)',
            }}
          >
            {title}
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

        {/* Content */}
        <div
          style={{
            paddingLeft: 'var(--spacing-medium)',
            paddingRight: 'var(--spacing-medium)',
            paddingTop: 'var(--spacing-extra-small)',
            paddingBottom: 'var(--spacing-extra-small)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-default)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--line-height-default)',
              color: 'var(--text-primary)',
            }}
          >
            {children}
          </div>
        </div>

        {/* Footer — 64px total: p-16 + 32px button height */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--spacing-medium)',
            padding: 'var(--spacing-medium)',
          }}
        >
          <LearnlightButton
            variant="txt"
            size="m"
            text={secondaryLabel}
            onClick={onSecondary}
          />
          <LearnlightButton
            variant="primary"
            size="m"
            text={primaryLabel}
            onClick={onPrimary}
          />
        </div>
      </div>
    </div>
  );
}
