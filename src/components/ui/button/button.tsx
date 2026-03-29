import styles from "./button.module.scss";

type ButtonType = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

export function Button({ text, onClick, type }: ButtonType) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
