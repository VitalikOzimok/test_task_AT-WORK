import type { UserApiResponse } from "../store/types";
import { transformApiResponseToCards } from "../components/utils/cardHelpers";

export async function getCards() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: UserApiResponse[] = await response.json();
  const firstSixData = data.slice(0, 6);

  return transformApiResponseToCards(firstSixData);
}
