import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateConversationDto {

    @IsNumber()
    @IsNotEmpty()
    authorId: number; //who created the conversation id

    @IsNumber()
    @IsNotEmpty()
    recipientId: number;

    @IsString()
    @IsNotEmpty()
    message: string

}

export class CreateChannelDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string; //dm or room

    @IsString()
    @IsNotEmpty()
    status: string // protected private or public

    @IsString()
    password?: string

    @IsNumber() // should i get the user from front ?
    @IsNotEmpty()
    user_id: number
}

export class JoinChannelDto {

    @IsNumber()
    @IsNotEmpty()
    conversation_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsString()
    password?: string
}

export class CreateDmDto {

    @IsString()
    @IsNotEmpty()
    type: string; //dm or room

    @IsNumber()
    @IsNotEmpty()
    senderId: number

    @IsNumber()
    @IsNotEmpty()
    recieverId: number

}