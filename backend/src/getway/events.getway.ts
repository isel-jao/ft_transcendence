
import { Query } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { getMetadataStorage, isArray } from "class-validator";
import { Server, Socket } from 'socket.io'
import { ICreateDm, IMember } from "src/conversations/Interface";
import { ConversationsService } from "src/conversations/conversations.service";
import { DmsServices } from "src/dms/dms.service";
import { MessagesService } from "src/messages/messages.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class EventsGeteway implements NestGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly messageService: MessagesService,
        private readonly conversations: ConversationsService,
        private readonly dms: DmsServices) { }

    afterInit(server: any) {
        console.log("init");
        this.server.on('connection', (socket) => {
            console.log(socket.id);
        })
    };

    // How to send data on connect
    async handleConnection(client: Socket) {
        // handleConnection(client: Socket) {
        // console.log("connect", client.handshake.query.id);
        if (!isArray(client.handshake.query.id)) {
            const user_id = Number(client.handshake.query.id);
            // getting all channels for connecetd user (query.id), to create rooms to joined to 
            const rooms = await this.conversations.getAllChannelsByUser(user_id);
            rooms.forEach((conv) => {
                client.join(conv.id.toString());
                console.log(`user joined room name: ${conv.name}`);
            });
            const dms = await this.dms.getAllDmsByUserId(1); // TODO change this
            dms.forEach((dm) => {
                client.join(dm.conversationId.toString());
                console.log(`user joined dm id: ${dm.id}`);
            })

        }
    };

    //TODO check this
    async handleDisconnect?(client: Socket) {

        const conversations = await this.conversations.getAllChannelsByUser(Number(client.handshake.query.id));
        const dms = await this.dms.getAllDmsByUserId(Number(client.handshake.query.id));
        conversations.forEach((conv) => {
            client.leave(conv.id.toString())
        })
        dms.forEach((dm) => {
            client.leave(dm.conversationId.toString())
        })
    };


    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() data: any, @ConnectedSocket() client: any) {
        console.log('message is ', data);
        const ret = await this.messageService.postMessages(data)
        this.server.to(data.conversationId.toString()).emit('onMessage', ret);
    }

    //joining new channel
    //TODO check this 
    @SubscribeMessage("newJoin")
    async onNewJoin(@MessageBody() data: any, @ConnectedSocket() client) {

        console.log("-------------------newJoin", data);
        const channel = await this.conversations.joinChannel(data);
        client.join(channel.id.toString());
        this.server.to(channel.id.toString()).emit("onJoin", channel);

    }



    //TODO add type
    @SubscribeMessage("newChannel")
    async onNewChannel(@MessageBody() data: any, @ConnectedSocket() client) {
        const channel = await this.conversations.createChannel(data);
        client.join(channel.id.toString());
        this.server.to(channel.id.toString()).emit("onChannel", channel);
    }




    //TODO ADD TYPE
    @SubscribeMessage("newDm")
    async onNewDm(@MessageBody() data: ICreateDm, @ConnectedSocket() client) {
        let dm;
        if (!(dm = await this.dms.getDm(data))) {
            dm = await this.dms.createDm(data);
            client.join(dm.id.toString());
        }

        console.log("-------onDm", { dm })
        this.server.to(dm.id.toString()).emit("onDm", dm);
    }



    // @SubscribeMessage("newMember")
    // async onNewMember(@MessageBody() data: IMember, @ConnectedSocket() client) {

    //     console.log("***************", data);

    // }




}

