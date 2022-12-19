/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Match {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  status: number;
  @ApiProperty({ required: false })
  winnerId: number;
  @ApiProperty({ required: false })
  loserId: number;
  @ApiProperty({ required: false })
  hostId: number;
  @ApiProperty({ required: false })
  guestId: number;
  @ApiProperty({ required: false })
  hostScore: number;
  @ApiProperty({ required: false })
  guestScore: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateMatchDto {
  @ApiProperty({ required: true })
  @IsInt()
  status: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  winnerId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  loserId: number;
  @ApiProperty({ required: true })
  @IsInt()
  hostId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  guestId: number;
  @ApiProperty({ required: true })
  @IsInt()
  hostScore: number;
  @ApiProperty({ required: true })
  @IsInt()
  guestScore: number;
}

export class UpdateMatchDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  status: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  winnerId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  loserId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  hostId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  guestId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  hostScore: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  guestScore: number;
}

