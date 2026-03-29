// Тип данных, которые приходят с API
export interface UserApiResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}
export interface CardType {
  id: number;
  name?: string;
  username: string;
  email?: string;
  city: string;
  phone?: string;
  company: string;
  isArchived?: boolean;
}

export interface CardFormData {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  company: string;
}

export interface CardStore {
  cards: CardType[];
  setCards: (cards?: CardType[]) => Promise<void> | void;
  updateCard: (id: number, updatedCard: Partial<CardType>) => void;
  removeCard: (id: number) => void;
  archiveCard: (id: number) => void;
  unarchiveCard: (id: number) => void;
}
