import { fetcher, poster } from "../helpers";

async function getAllFriends(user_id: number) {
  //TODO get the user id fron the auth and gandel errors in case of throw
  return fetcher({
    path: `user/${user_id}`,
    queryPayload: {
      include: "friends",
    },
  })
    .then((result) => {
      return result.friends;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { getAllFriends };
