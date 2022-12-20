import { Injectable } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { PrismaService } from "src/prisma.service";


@Injectable()
@Public()
export class DmsServices {

    constructor(private prisma: PrismaService) { }

    //TODO add return type check it with marji
    async getAllDmsOfUser(userId: number) {
        const conversationIds = await this.prisma.user_Conv.findMany({
            where: {
                conversation: {
                    type: "dm",
                },
                user: {
                    id: userId
                },
            },
            select: {
                conversationId: true,
            }
        }).then((result) => result.map(({ conversationId }) => conversationId));

        const dms = await this.prisma.user_Conv.findMany({
            where: {
                user: {
                    isNot: {
                        id: userId,
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

}


