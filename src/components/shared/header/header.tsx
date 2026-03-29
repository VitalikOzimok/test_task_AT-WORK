import styles from "./header.module.scss";

interface HeaderProps {
  header: string;
  size?: string;
}

export function Header({ header, size }: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        style={size ? { fontSize: `var(--${size})` } : {}}
      >
        {header}
      </div>
      <div className={styles.line} />
    </div>
  );
}
