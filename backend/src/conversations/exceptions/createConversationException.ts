import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class createConversationException extends HttpException {

    constructor(customMessage?: string, statusCode?: HttpStatus) {
        super(customMessage ? customMessage : "",
            statusCode ? statusCode : HttpStatus.NOT_FOUND);
    }
}