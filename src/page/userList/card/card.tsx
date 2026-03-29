import styles from "./card.module.scss";
import { images } from "./../../../assets/icons/index";
import { DropdownMenu } from "../../../components/ui/dropdownMenu/dropdownMenu";
import { useCardStore } from "../../../store/cardStore";

interface CardProps {
  id: number;
  name: string;
  city: string;
  company: string;
}

export function Card({ id, name, city, company }: CardProps) {
  const card = useCardStore((state) =>
    state.cards.find((card) => card.id === id),
  );

  const isArchived = card?.isArchived || false;
  return (
    <div className={`${styles.card} ${isArchived ? styles.imageArchived : ""}`}>
      <img src={images.Chel} alt="Аватар" className={styles.image} />

      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{name}</p>
          <div className={styles.icon}>
            <DropdownMenu id={id} isArchived={isArchived} />
          </div>
        </div>
        <p className={styles.subtitle}>{company}</p>
        <p className={styles.city}>{city}</p>
      </div>
    </div>
  );
}
