import { CreateConversationPrams } from "src/utils/types";

export interface IConversationsService  {
    
    createConversation(conversationParams: CreateConversationPrams);  
}