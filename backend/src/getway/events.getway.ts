
import { Query } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { isArray } from "class-validator";
import { Server, Socket } from 'socket.io'
import { ConversationsService } from "src/conversations/conversations.service";
import { MessagesService } from "src/messages/messages.service";

@WebSocketGateway({ cors: true })
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
    handleConnection(client: Socket) {
        // handleConnection(client: Socket) {
        // console.log("connect", client.handshake.query.id);
        if (!isArray(client.handshake.query.id)) {
            const user_id = client.handshake.query.id;
            this.conversations.getAllChannels(user_id);

        }


    };

    handleDisconnect?(client: any) {
        console.log("disconnect");
    };


    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() data: string, @ConnectedSocket() client: any) {
        console.log('message is ', data);
        // this.X.savemessage();
        //afterteh result resolving 
        this.messageService.postMessages(data).then((message) => {
            this.server.emit('onMessage', message)
        });


    }
}

