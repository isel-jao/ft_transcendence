
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import {Server} from 'socket.io'

@WebSocketGateway({cors: true})
export class EventsGeteway implements NestGateway {

    afterInit(server: any) {
        console.log("init");
        this.server.on('connection', (socket)=>{
            console.log(socket.id);
            console.log("connected");
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
    onNewMessage(@MessageBody() data: string, @ConnectedSocket() client: any){
        console.log('message is ',data);
        this.server.emit('onMessage', data)
    }


}

