/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional, IsBoolean } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class User {
  @ApiProperty({ required: false })
  id: number;
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
  status: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  isFistSignIn: boolean;
}

export class CreateUserDto {
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
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  status: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isFistSignIn: boolean;
}

export class UpdateUserDto {
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
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  status: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isFistSignIn: boolean;
}

