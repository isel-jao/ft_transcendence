import { Body, Injectable } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateConversationDto } from "./dto/createConversation.dto";


@Injectable()
export class ConversationsService {
   constructor(private prisma: PrismaService) { }
   //TODO add type
   async createConversation(data: any): Promise<Conversation | null> {
      return this.prisma.conversation.create({ data });
   }

   async findAllConversations() {
      const res = await this.prisma.user_Conv.findMany({
         where: {
            userId: 1,
            conversation: {
               type: 'dm'
            }
         },
         include: {
            conversation: {
               select: {
                  id: true,
                  name: true,
               }
            },
         }
      })

      return await Promise.all(res.map(async (elm) => {
         return await this.prisma.user_Conv.findFirst({
            where: {
               conversationId: elm.conversationId,
               NOT: {
                  userId: 1,
               }
            },
            include: {
               user: {
                  select: {
                     userName: true,

                  }
               }
            }
         })

         // return ({
         //    id_conversation: elm.conversationId,
         //    name: r.user.userName,
         //    status: r.user.
         // });
      }))
   }


   async findConversation(id_conversation: number) {
      return this.prisma.conversation.findUnique({
         where: {
            id: id_conversation,
         }
      });
   }

}