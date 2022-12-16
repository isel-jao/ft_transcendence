
import { Query } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { isArray } from "class-validator";
import { Server, Socket } from 'socket.io'
import { ConversationsService } from "src/conversations/conversations.service";
import { MessagesService } from "src/messages/messages.service";

@WebSocketGateway({
    cors: {
        origin: [process.env.FRONTURL,],
    }
})
export class EventsGeteway implements NestGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messageService: MessagesService,
        private readonly conversations: ConversationsService) { }
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
            const user_id = client.handshake.query.id;
            // getting all channels for connecetd user (query.id), to create rooms to joined to 
            const conversations = await this.conversations.getAllChannelsByUser(Number(user_id));
            conversations.forEach((conv) => {
                client.join(conv.id.toString());
                console.log(`user joined rooms ${conv.name}`);
            });

        }
    };

    async handleDisconnect?(client: Socket) {
        const conversations = await this.conversations.getAllChannelsByUser(Number(client.handshake.query.id));
        conversations.forEach((conv) => {
            client.leave(conv.name.toString())
            console.log(`user leaved rooms ${conv.name}`);
        })

    };


    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() data: any, @ConnectedSocket() client: any) {
        console.log('message is ', data);
        // this.X.savemessage();
        //afterteh result resolving 
        const ret = await this.messageService.postMessages(data)

        this.server.to(data.conversationId.toString()).emit('onMessage', ret);
        // .then((message) => {
        //     // this.server.to(data.conversationId.toString()).emit('onMessage', message)
        //     // client.emit('onMessage', message);
        //     // this.server.emit('onMessage', message)
        // });
    }


    //joining new channel
    //TODO check this 
    @SubscribeMessage("newJoin")
    async onNewJoin(@MessageBody() data: any, @ConnectedSocket() client) {
        client.join(data.conversation_id.toString());
        const channel = await this.conversations.joinChannel(data);
        this.server.emit("onJoin", channel);

        console.log(`user ${data.user_id} joined conversation ${data.conversation_id}`)
    }



    //add event listner  @SubscribeMessage join channel 
}

