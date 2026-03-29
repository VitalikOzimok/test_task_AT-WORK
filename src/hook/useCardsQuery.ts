import { useQuery } from "@tanstack/react-query";
import { getCards } from "../api/cards";
import { useCardStore } from "../store/cardStore";
import { useEffect } from "react";

export const useCardsQuery = () => {
  const { cards, setCards } = useCardStore();

  const hasData = cards.length > 0;

  const query = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
    enabled: !hasData,
  });

  useEffect(() => {
    if (query.data && !hasData) {
      setCards(query.data);
    }
  }, [query.data, setCards, hasData]);

  return query;
};
