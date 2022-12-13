import { fetcher, poster } from "../helpers";
import { status } from "../types";

//to get all rooms
async function getConversations() {
  return fetcher({ path: "rooms/1" }) // ToRemove 1: replace it with user id
    .then((result) => {
      console.log(result);
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

interface IFJoinChannelType {
  conversation_id: number;
  user_id: number;
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

async function getConversationMessages(id_conversation?: number) {
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

async function deleteConversationById(id_conversation: number) {
  return poster(`rooms/${id_conversation}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function getAllConvrsations() {
  return fetcher({ path: "rooms/all" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function joinChannel(queryPayload: IFJoinChannelType) {
  return poster(`rooms/joinChannel`, queryPayload)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export {
  getConversations,
  postChannel,
  getConversationMessages,
  deleteConversationById,
  getAllConvrsations,
  joinChannel,
};
