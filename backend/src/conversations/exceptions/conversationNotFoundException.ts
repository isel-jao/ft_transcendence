import { HttpException, HttpStatus } from "@nestjs/common";

export class conversationNotFoundException extends HttpException {
    constructor() {
        super("Conversation Not Found", HttpStatus.NOT_FOUND);
    };
}