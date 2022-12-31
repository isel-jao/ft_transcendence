/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Badge {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  descreption: string;
  @ApiProperty({ required: false })
  logo: string;
}

export class CreateBadgeDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  descreption: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  logo: string;
}

export class UpdateBadgeDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  descreption: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  logo: string;
}

