import { HttpException, HttpStatus } from "@nestjs/common";


export class ConversationExistException extends HttpException {
    constructor() {
        super("Conversation Already Exists", HttpStatus.CONFLICT);
    }
}