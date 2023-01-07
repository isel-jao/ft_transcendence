import { Injectable } from "@nestjs/common";
import { Conversation, roomStatus } from "@prisma/client";
import { Public } from "src/auth/decorators/public.decorator";
import { ICreateDm } from "src/conversations/Interface";
import { PrismaService } from "src/prisma.service";


@Injectable()
@Public()
export class DmsServices {
    constructor(private prisma: PrismaService) { }

    //TODO add return type check it with marji
    async getAllDmsOfUser(userId: number) {
        const conversationIds = await this.prisma.user_Conv.findMany({
            where: {
                conversation: { type: "dm" },
                user: { id: userId },
            },
            select: { conversationId: true }
        }).then((result) => result.map(({ conversationId }) => conversationId));

        const dms = await this.prisma.user_Conv.findMany({
            where: {
                user: {
                    isNot: {
                        id: userId
                    }
                },
                conversation: {
                    id: {
                        in: conversationIds,
                    }
                }
            },
            select: {
                conversationId: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        userName: true,
                    }
                }
            }
        }).then((dms) => dms.map(({ conversationId, user }) => ({ conversationId, ...user })));
        return (dms);
    }

    async getAllDmsByUserId(userId: number) {
        const dmsIds = await this.prisma.user_Conv.findMany({
            where: {
                userId: userId,
                conversation: {
                    type: "dm",
                },
            }
        })
        return (dmsIds);
    }

    async getDm(data: ICreateDm) {
        const dmExists = await this.prisma.conversation.findFirst({
            where: {
                OR: [{ name: `dm-${data.senderId}-${data.recieverId}` },
                { name: `dm-${data.recieverId}-${data.senderId}` }]
            },
        });
        return dmExists;
    }

    //TODO add type
    //check if dm exist or create one 
    async createDm(data) {
        const conversation = {
            status: roomStatus.PRIVATE,
            name: `dm-${data.senderId}-${data.recieverId}`,
            type: data.type,
        }
        const createDm = await this.prisma.conversation.create({ data: conversation });
        if (createDm) {
            await this.prisma.user_Conv.create({
                data: {
                    conversation: { connect: { id: createDm.id } },
                    user: { connect: { id: data.senderId } },
                    is_admin: false,
                    is_owner: false,
                },
            });
            await this.prisma.user_Conv.create({
                data: {
                    conversation: { connect: { id: createDm.id } },
                    user: { connect: { id: data.recieverId } },
                    is_admin: false,
                    is_owner: false
                },
            })
        }
        return ({ conversationId: createDm.id, ...createDm });
    }

}


