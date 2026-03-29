import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CardType, CardStore } from "./types";
import { getCards } from "../api/cards";

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: [],

      setCards: async (cards?: CardType[]) => {
        if (cards) {
          set({ cards });
          return;
        }
        try {
          const cardsFromApi = await getCards();
          set({ cards: cardsFromApi });
        } catch (error) {
          console.error("Failed to load cards:", error);
        }
      },

      updateCard: (id: number, updatedCard: Partial<CardType>) => {
        const { cards } = get();
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, ...updatedCard } : card,
        );
        set({ cards: updatedCards });
      },

      removeCard: (id: number) => {
        const { cards } = get();
        const filteredCards = cards.filter((card) => card.id !== id);
        set({ cards: filteredCards });
      },

      archiveCard: (id: number) => {
        const { cards } = get();
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, isArchived: true } : card,
        );
        set({ cards: updatedCards });
      },

      unarchiveCard: (id: number) => {
        const { cards } = get();
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, isArchived: false } : card,
        );
        set({ cards: updatedCards });
      },
    }),
    {
      name: "card-storage",
      partialize: (state) => ({ cards: state.cards }),
    },
  ),
);
