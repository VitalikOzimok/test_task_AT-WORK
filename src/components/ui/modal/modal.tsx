import styles from "./modal.module.scss";
import Close from "./../../../assets/icons/Close.svg";
import SuccessIcon from "./../../../assets/icons/SuccessIcon.svg";

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Modal({ setIsOpen }: ModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={() => setIsOpen(false)}>
          <img src={Close} alt="Закрыть" />
        </button>

        <div className={styles.modalBody}>
          <img src={SuccessIcon} alt="Успех" />
          <p className={styles.successMessage}>Изменения сохранены!</p>
        </div>
      </div>
    </div>
  );
}
