/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Profile {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  status: number;
  @ApiProperty({ required: false })
  points: number;
  @ApiProperty({ required: false })
  userId: number;
  @ApiProperty({ required: false })
  winStrike: number;
}

export class CreateProfileDto {
  @ApiProperty({ required: true })
  @IsInt()
  status: number;
  @ApiProperty({ required: true })
  @IsInt()
  points: number;
  @ApiProperty({ required: true })
  @IsInt()
  userId: number;
  @ApiProperty({ required: true })
  @IsInt()
  winStrike: number;
}

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  status: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  points: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  userId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  winStrike: number;
}

