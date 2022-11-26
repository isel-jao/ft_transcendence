
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Server } from 'socket.io'
import { MessagesService } from "src/messages/messages.service";

@WebSocketGateway({ cors: true })
export class EventsGeteway implements NestGateway {

    constructor(private readonly messageService: MessagesService) { }
    afterInit(server: any) {
        console.log("init");
        this.server.on('connection', (socket) => {
            console.log(socket.id);
        })
    };

    handleConnection(...args: any[]) {
        console.log("connect");
    };

    handleDisconnect?(client: any) {
        console.log("disconnect");
    };

    @WebSocketServer()
    server: Server;

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

