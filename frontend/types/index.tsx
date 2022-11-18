interface IFMessage {
  message_id: number;
  message_body: string;
  date: string;
  send_by: string;
}

interface IFchannel {
  channel_name: string;
  type: string; //protected public private
}

interface IFUser {
  user_name: string;
  status_user: string; //onine offline mute..
  role: string; //admin ,member or owner
}

export enum status {
  PUBLIC,
  PROTECTED,
  PRIVATE,
}

export type { IFchannel, IFMessage, IFUser };
