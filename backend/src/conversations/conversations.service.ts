import { Body, Injectable } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateChannelDto, CreateConversationDto } from "./dto/dto";


@Injectable()
export class ConversationsService {
   constructor(private prisma: PrismaService) { }

   //TODO add return type 
   //TODO gandel errors and throw exception
   async createChannel(data: any): Promise<any | null> {
      const channel = await this.prisma.conversation.create({ data: data });
      return channel
   }

   async getAllChnnels(): Promise<any | null> {
      const channels = await this.prisma.conversation.findMany();
      return channels;
   }

   async getChannelById(id_conversation: number): Promise<any | null> {
      const channel = await this.prisma.conversation.findUniqueOrThrow({
         where: {
            id: id_conversation
         }
      })
      console.log({ channel })
      return channel;
   }


   async deleteChannelById(id_conversation: number): Promise<any | null> {
      const channel = await this.prisma.conversation.delete({
         where: {
            id: id_conversation
         }
      })
      return channel;
   }

   async updateChannel(channelPayload: any, id_conversation: number): Promise<any | null> {
      console.log({ id_conversation })
      const channel = await this.prisma.conversation.update({
         data: channelPayload, where: {
            id: id_conversation
         }
      });

      return (channel);
   }
}