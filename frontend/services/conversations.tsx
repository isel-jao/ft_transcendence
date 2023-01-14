import { fetcher, poster } from "../helpers";
import { status } from "../types";

//to get all rooms
async function getConversations() {
  return fetcher({ path: "rooms/1" }) // ToRemove 1: replace it with user id
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
  user_id: number;
}

interface IFJoinChannelType {
  conversation_id: number;
  user_id: number;
  password?: string;
}

//to create new channel
async function createChannel(queryPayload: IFCreateChannelType) {
  return poster("rooms", queryPayload)
    .then((result) => {
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

async function leaveConversation(id_conversation: number) {
  return poster(`rooms/${id_conversation}`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function getAllConvrsations() {
  const user_id = 1; //TODO get userid from user
  return fetcher({ path: `rooms/all/${user_id}` })
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
      throw new Error(error);
    });
}

//TODO get user_id from the auth
async function getAllDmsOfuser(user_id: number) {
  return fetcher({ path: `dms/all/${user_id}` })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

//get members users of a channel(room) passing the id conversation
async function getChannelMembers(id_conversation: number) {
  return fetcher({ path: `rooms/members/${id_conversation}` })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export {
  getConversations,
  createChannel,
  getConversationMessages,
  leaveConversation,
  getAllConvrsations,
  joinChannel,
  getAllDmsOfuser,
  getChannelMembers,
};
