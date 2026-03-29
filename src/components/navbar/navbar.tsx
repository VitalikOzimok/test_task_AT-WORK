import { images } from "../../assets/icons/index";
import styles from "./NavBar.module.scss";

export function NavBar() {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={images.Logo} alt="Логотип" className={styles.logoIcon} />
          <div className={styles.logoText}>
            <span className={styles.logoPart1}>at-</span>
            <span className={styles.logoPart2}>work</span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.iconsContainer}>
            <img src={images.Hearth} alt="Избранное" className={styles.icon} />
            <img src={images.Bell} alt="Уведомления" className={styles.icon} />
          </div>

          <div className={styles.userContainer}>
            <div className={styles.avatar}>
              <img src={images.Chel} alt="Аватар пользователя" />
            </div>
            <p className={styles.username}>ivan1234</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
