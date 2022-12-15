import { Body, HttpStatus, Injectable } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateChannelDto, CreateConversationDto } from "./dto/dto";
import { ConversationExistException } from "./exceptions/conversationExists";
import { createConversationException } from "./exceptions/createConversationException";
import { conversation } from "./Interface";


@Injectable()
export class ConversationsService {
   constructor(private prisma: PrismaService) { }

   //TODO add return type 
   //TODO gandel errors and throw exception doesnt work
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
      throw new createConversationException("channel doesnt exists");
   }


   async deleteChannelById(id_conversation: number): Promise<any | null> {
      return await this.prisma.user_Conv.delete({
         where: {
            userId_conversationId: {
               userId: 1, //TODO replace with a user_id
               conversationId: id_conversation,

            }
         }
      })
      // const channel = await this.prisma.conversation.delete({
      //    where: {
      //       id: id_conversation
      //    }
      // })
      // if (channel)
      //    return channel;
      // throw new createConversationException("channel doesnt exists");
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
      throw new createConversationException("channel doesnt exists");
   }

   async getAllChannelsByUser(user_id: number) {

      return await this.prisma.user_Conv.findMany({
         where: {
            userId: user_id,
         },
         select: {
            conversation: {
               select: {
                  id: true,
                  name: true,
                  status: true
               }
            }
         },
      }).then((result) => result.map((item) => {
         return item.conversation;
      }))
   }


   /* get all oublic and protected channels that are room type only 
      where a user not joined yet
   */
   async getAllUnjoinedChannels(user_id: number) {
      const conversations = await this.prisma.conversation.findMany({
         where: {
            type: "room",
            status: {
               not: {
                  equals: "PRIVATE"
               }
            },
            User_Conv: {
               every: {
                  NOT: {
                     userId: user_id
                  }
               }
            }
         },
         select: {
            id: true,
            name: true,
            status: true,
         }
      });
      // const user_conversations = await this.prisma.user_Conv.findMany({
      //    where: {
      //       userId: user_id,
      //    },
      //    select: {
      //       conversation: {
      //          select: {
      //             id: true,
      //             name: true,
      //             status: true
      //          }
      //       }
      //    }
      // }).then((result) => result.map((item) => {
      //    return item.conversation;
      // }))


      // //gets all the conversations of a user tha's not already joined
      // return (conversations.filter(({ id: first }) =>
      //    !user_conversations.some(({ id: second }) => first == second)))
      return conversations;
   }


   //TODO add type
   async joinChannel(payload: {
      conversation_id: number, user_id: number, password?: string
   }) {

      const constraints = await this.prisma.conversation.findUnique({
         where: {
            id: payload.conversation_id
         },
         select: {
            status: true,
            password: true
         }
      });

      if ((constraints.status != "PUBLIC" &&
         constraints.password == payload.password) ||
         constraints.status == "PUBLIC") {
         const channel = await this.prisma.user_Conv.create({
            data: {
               conversation: {
                  connect: {
                     id: payload.conversation_id,
                  }
               },
               user: {
                  connect: {
                     id: payload.user_id,
                  }
               },
               is_admin: false, //TODO to be changed
            }
         })
         return channel;
      } else {
         throw new createConversationException("can't access to the channel");
      }
   }
}