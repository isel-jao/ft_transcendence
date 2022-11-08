import { fetcher } from "../helpers";

async function getConversations() {
  return fetcher({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { getConversations };
