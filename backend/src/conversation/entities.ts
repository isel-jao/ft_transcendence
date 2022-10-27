/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Conversation {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  type: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  status: number;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  createdAt: Date;
}

export class CreateConversationDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  type: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: true })
  @IsInt()
  status: number;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  password: string;
}

export class UpdateConversationDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  type: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  status: number;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  password: string;
}

