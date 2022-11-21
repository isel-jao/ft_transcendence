import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class createConversationExceptipn extends HttpException {

    constructor(customMessage?: string, statusCode?: HttpStatus) {
        super(customMessage ? customMessage : "",
            statusCode ? statusCode : HttpStatus.NOT_FOUND);
    }
}