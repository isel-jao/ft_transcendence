import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class MessagesService {

    constructor(private prisma: PrismaService) { }

    async getAllMessages(): Promise<any | null> {
        return await this.prisma.message.findMany({});
    }

    async getMessages(id: number): Promise<any | null> {
        return await this.prisma.message.findMany({
            where: {
                conversationId: id,

            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                body: true,
                createdAt: true,
                conversationId: true,
                sentBy: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
    }

    async postMessages(messagePayload) {
        const message = await this.prisma.message.create({
            data: messagePayload,
            select: {
                body: true,
                createdAt: true,
                conversationId: true,
                sentBy: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
        // console.log(message)
        return message;
    }

}