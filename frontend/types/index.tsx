interface IFMessage {
  body: string;
  createdAt: string;
  sentBy: {
    firstName: string;
    lastName: string;
  };
}

interface IFchannel {
  id: number;
  name: string;
  status: string; //protected public private
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

export type { IFchannel, IFMessage, IFUser };
