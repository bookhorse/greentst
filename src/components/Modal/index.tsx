import { useEffect } from 'react';
import styles from '../styles.module.scss';
import { createPortal } from 'react-dom';
import Button from '../Button';

export interface ModalProps {
  title: string;
  open: boolean;
  children: React.ReactNode;
  onAction: () => void;
  onClose: () => void;
};

const Modal = ({children, title, open, onClose, onAction}: ModalProps) => {
  useEffect(() => {
    if (open) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <header className={styles.header}>{title}</header>
      {
        createPortal(
          <div className={styles.backdrop} onClick={() => onClose()}></div>, document.body
        )
      }
      { children }
      <footer className={styles.buttons}>
        <Button onClick={onAction}>Save</Button>
      </footer>
    </div>
  );
};

export default Modal;
