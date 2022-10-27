/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class User {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  login: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  firstName: string;
  @ApiProperty({ required: false })
  lastName: string;
  @ApiProperty({ required: false })
  userName: string;
  @ApiProperty({ required: false })
  imageUrl: string;
  @ApiProperty({ required: false })
  tfaSecret: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  login: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  email: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  userName: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  imageUrl: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  tfaSecret: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  login: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  userName: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  imageUrl: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  tfaSecret: string;
}

