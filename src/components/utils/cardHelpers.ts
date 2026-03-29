import type { UserApiResponse, CardType } from "./../../store/types";

export const transformApiResponseToCard = (
  apiUser: UserApiResponse,
): CardType => ({
  id: apiUser.id,
  name: apiUser.name,
  username: apiUser.username,
  email: apiUser.email,
  city: apiUser.address.city,
  phone: apiUser.phone,
  company: apiUser.company.name,
});

export const transformApiResponseToCards = (
  apiUsers: UserApiResponse[],
): CardType[] => apiUsers.map(transformApiResponseToCard);
