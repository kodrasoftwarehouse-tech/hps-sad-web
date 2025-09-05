import type { ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  canClose?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  canClose = true,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${className || ""}`}>
        {canClose && (
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

