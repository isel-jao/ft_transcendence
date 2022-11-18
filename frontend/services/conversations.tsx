import { fetcher, poster } from "../helpers";

async function getConversations() {
  // return fetcher({})
  //   .then((result) => {
  //     return result;
  //   })
  //   .catch((error) => {
  //     throw new Error(error);
  // });
}

interface IFCreateChannelType {
  name: string;
  status: number;
  type: string;
  password: string;
}

async function postChannel(queryPayload: IFCreateChannelType) {
  console.log({ queryPayload });
  return poster("/create_channel", queryPayload)
    .then((result) => result)
    .catch((err) => {
      throw new Error(err);
    });
}

export { getConversations, postChannel };
