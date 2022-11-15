import { fetcher, poster } from "../helpers";

async function getConversations() {
  // return fetcher({})
  //   .then((result) => {
  //     return result;
  //   })
  //   .catch((error) => {
  //     throw new Error(error);
  //   });
}

interface IFCreateChannelType {
  name: string;
  type: string;
  password: string;
}

async function postChannel(queryPayload: IFCreateChannelType) {
  return poster("", queryPayload)
    .then((result) => result)
    .catch((err) => {
      throw new Error(err);
    });
}

export { getConversations, postChannel };
