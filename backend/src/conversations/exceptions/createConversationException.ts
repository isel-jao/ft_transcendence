import { BadRequestException, HttpException } from "@nestjs/common";

export class createConversationExceptipn extends BadRequestException {

    constructor(customMessage?: string) {
        super(customMessage ? customMessage : "");
    }
}