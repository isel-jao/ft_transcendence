import { Body, HttpStatus, Injectable } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateChannelDto, CreateConversationDto } from "./dto/dto";
import { ConversationExistException } from "./exceptions/conversationExists";
import { createConversationExceptipn } from "./exceptions/createConversationException";
import { conversation } from "./Interface";


@Injectable()
export class ConversationsService {
   constructor(private prisma: PrismaService) { }

   //TODO add return type 
   //TODO gandel errors and throw exception dosrny work
   async createChannel(data): Promise<Conversation | null> {

      const recordExists = await this.prisma.conversation.findUnique({
         where: {
            name: data.name
         }
      })
      const channel = await this.prisma.conversation.create({ data: data });
      if (recordExists)
         throw new ConversationExistException()
      return channel
   }

   //TODO change the way of getting id_user
   async getAllChnnels(): Promise<any | null> {
      const id_user = 1;
      const channels = await this.prisma.conversation.findMany(
         {
            where: {
               type: "room",

            },
            select: {
               id: true,
               name: true,
               status: true,
            }
         });
      return (channels)
   }

   async getChannelById(id_conversation: number): Promise<any | null> {
      const channel = await this.prisma.conversation.findUniqueOrThrow({
         where: {
            id: id_conversation
         }
      })

      if (channel)
         return channel;
      throw new createConversationExceptipn("channel doesnt exists");
   }


   async deleteChannelById(id_conversation: number): Promise<any | null> {
      const channel = await this.prisma.conversation.delete({
         where: {
            id: id_conversation
         }
      })
      if (channel)
         return channel;
      throw new createConversationExceptipn("channel doesnt exists");
   }

   async updateChannel(channelPayload: any, id_conversation: number): Promise<any | null> {
      console.log({ id_conversation })
      const channel = await this.prisma.conversation.update({
         data: channelPayload, where: {
            id: id_conversation
         }
      });
      if (channel)
         return (channel);
      throw new createConversationExceptipn("channel doesnt exists");

   }
}