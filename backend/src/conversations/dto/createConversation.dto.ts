import  { IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class CreateConversationDto {

    @IsNumber()
    @IsNotEmpty()
    authorId: number; //who created the conversation id

    @IsNumber()
    @IsNotEmpty()
    recipientId:number;

    @IsString()
    @IsNotEmpty()
    message:string

}