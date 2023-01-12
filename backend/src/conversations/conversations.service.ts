import { Body, HttpStatus, Injectable } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { comparePasswords, encodePassword } from "src/utils/bycrypt";
import { createRoomDto, CreateConversationDto } from "./dto/dto";
import { ConversationExistException } from "./exceptions/conversationExists";
import { createConversationException } from "./exceptions/createConversationException";
import { conversation } from "./Interface";
import { channel } from "diagnostics_channel";



@Injectable()
export class ConversationsService {
   constructor(private prisma: PrismaService) { }

   //TODO add return type 
   async createRoom(data: any): Promise<Conversation | null> {
      const user_id = data.user_id;
      var password;
      delete data.user_id;

      const recordExists = await this.prisma.conversation.findUnique({
         where: {
            name: data.name
         }
      })
      if (recordExists)
         throw new ConversationExistException();

      if (password != "")
         password = encodePassword(data.password);

      const room = await this.prisma.conversation.create({ data: { ...data, password } });
      if (room) {
         await this.prisma.user_Conv.create({
            data: {
               conversation: {
                  connect: {
                     id: room.id,
                  }
               },
               user: {
                  connect: {
                     id: user_id,
                  }
               },
               //the user who creates the channel it ownes it until he leave 
               is_admin: true,
               is_owner: true,
            }
         })
      }
      else
         throw new createConversationException("Room doesn't exist", 404);
      return (room);
   }

   //TODO change the way of getting id_user
   async getAllChannels(): Promise<any | null> {
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
   }

   async updateChannel(channelPayload: any, id_conversation: number): Promise<any | null> {
      // console.log({ id_conversation })
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
            userId: 1,
            conversation: {
               type: "room"
            }
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
      return conversations;
   }


   //TODO add type
   async joinChannel(payload: {
      id: number, user_id: number, password?: string
   }) {
      const constraints = await this.prisma.conversation.findUnique({
         where: {
            id: payload.id
         },
         select: {
            status: true,
            password: true
         }
      });

      if ((constraints.status != "PUBLIC" &&
         await comparePasswords(payload.password, constraints.password)) ||
         constraints.status == "PUBLIC") {
         const channel = await this.prisma.user_Conv.create({
            data: {
               conversation: {
                  connect: {
                     id: payload.id,
                  }
               },
               user: {
                  connect: {
                     id: payload.user_id,
                  }
               },
               is_admin: false, //TODO to be changed
               is_owner: false
            },
            select: {
               user: true,
            }
         })
         // console.log("-----------", channel);
         if (channel)
            return channel;
         throw new createConversationException("join channel: something went wrong", 400);
      } else {
         throw new
            createConversationException("Wrong password, can't access to the channel");
      }
   }


   //get all members of a conversation_id
   async getChannelMembers(id: number) {
      const members = await this.prisma.user_Conv.findMany({
         where: {
            conversationId: id,
            conversation: {
               type: "room"
            }
         },
         select: {
            user: {
               select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  userName: true,
                  imageUrl: true,
               }
            },
            status: true,
            is_admin: true,
            is_owner: true,
         }
      }).then((result) => {
         return result.map(({ user, status, is_admin, is_owner }) => {
            user["status"] = status;
            user["is_admin"] = is_admin;
            user["is_owner"] = is_owner;
            return user;
         })
      })

      return members;

   }






}