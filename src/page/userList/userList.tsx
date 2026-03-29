import { Card } from "../../page/userList/card/card";
import styles from "./userList.module.scss";
import { Loader } from "../../components/ui/loader/loader";
import { useCardStore } from "../../store/cardStore";
import { useCardsQuery } from "../../hook/useCardsQuery";
import type { CardType } from "../../store/types";
import { Header } from "../../components/shared/header/header";

export function UserList() {
  const { cards } = useCardStore();
  const activeCards = cards.filter((card) => !card.isArchived);
  const arhiveCards = cards.filter((card) => card.isArchived);
  const { isLoading, isError, error } = useCardsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Header header="Активные" size="title" />
      <div className={styles.userList}>
        <div className={styles.grid}>
          {activeCards.map((item: CardType) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.username}
              city={item.city}
              company={item.company}
            />
          ))}
        </div>
      </div>
      <Header header="Архив" size="title" />
      <div className={styles.archiveList}>
        <div className={styles.grid}>
          {arhiveCards.map((item: CardType) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.username}
              city={item.city}
              company={item.company}
            />
          ))}
        </div>
      </div>
    </>
  );
}
