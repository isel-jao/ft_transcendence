import { type } from "os";

interface IFuser {
  name: string;
  status: string;
}

interface IFMessage {
  message_id: number;
  message_body: string;
  date: string;
}

interface IFConversation {
  id_conversation: number;
  sent_by: IFuser;
  messages: IFMessage[];
}

export type { IFuser, IFMessage, IFConversation };
