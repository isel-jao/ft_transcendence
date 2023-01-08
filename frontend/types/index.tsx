enum userStatus {
  MUTED = "muted",
  ACTIVE = "active",
  BANNED = "banned",
  PENDING = "pending",
}

//TODO remove all not used types

interface IFMessage {
  body: string;
  createdAt: string;
  sentBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface IFUser {
  user_name: string;
  status_user: string; //onine offline mute..
  role: string; //admin ,member or owner
}

export enum status {
  PUBLIC = "PUBLIC",
  PROTECTED = "PROTECTED",
  PRIVATE = "PRIVATE",
}
interface IConversation {
  id: number;
  name: string;
  type?: string; //protected public private in case of Room
  status?: string; // active blocked muted in case of Dm
}

interface IDm {
  conversationId: number;
  firstName: string;
  lastName: string;
  userName: string;
}

//a channel memebr type
interface IMember {
  id: 3;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
  status: userStatus;
  is_admin: boolean;
  is_owner: boolean;
}

export type { IFMessage, IFUser, IConversation, IDm, IMember };
