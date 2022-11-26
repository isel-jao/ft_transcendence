import { fetcher, poster } from "../helpers";
import { status } from "../types";

//to get all rooms
async function getConversations() {
  return fetcher({ path: "rooms" })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

interface IFCreateChannelType {
  name: string;
  status: string;
  type: string;
  password?: string;
}

//to create new channel
async function postChannel(queryPayload: IFCreateChannelType) {
  console.log({ queryPayload });
  return poster("rooms", queryPayload)
    .then((result) => {
      console.log({ result });
      return result;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

//to get a conversations messages

async function getConversationMessages(id_conversation: number) {
  return fetcher({
    path: `messages/${id_conversation}`,
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export { getConversations, postChannel, getConversationMessages };
