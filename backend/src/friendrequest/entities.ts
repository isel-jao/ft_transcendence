/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class FriendRequest {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  fromId: number;
  @ApiProperty({ required: false })
  toId: number;
  @ApiProperty({ required: false })
  status: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateFriendRequestDto {
  @ApiProperty({ required: true })
  @IsInt()
  fromId: number;
  @ApiProperty({ required: true })
  @IsInt()
  toId: number;
  @ApiProperty({ required: true })
  @IsInt()
  status: number;
}

export class UpdateFriendRequestDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  fromId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  toId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  status: number;
}

