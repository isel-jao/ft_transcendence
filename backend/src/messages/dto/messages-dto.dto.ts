import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveMessageDto {
    @IsNumber()
    @IsNotEmpty()
    senderId: number;


    @IsNumber()
    @IsNotEmpty()
    conversationId: number;

    @IsString()
    @IsNotEmpty()
    body: string;
}