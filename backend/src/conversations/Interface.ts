
export interface conversation {
    name: string
    password?: string,
    status: string,
    type: string
}


export interface Conversation {
    id: number,
    name: string,
    status: string,

}


export interface ICreateDm {
    type: string; //dm or room
    senderId: number;
    recieverId: number;
}