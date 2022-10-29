/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Message {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  conversation_id: number;
  @ApiProperty({ required: false })
  body: string;
  @ApiProperty({ required: false })
  sentById: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateMessageDto {
  @ApiProperty({ required: true })
  @IsInt()
  conversation_id: number;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  body: string;
  @ApiProperty({ required: true })
  @IsInt()
  sentById: number;
}

export class UpdateMessageDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  conversation_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  body: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  sentById: number;
}

