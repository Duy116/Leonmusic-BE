import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  born?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string

  @ApiProperty()
  @IsOptional()
  instrument?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  lessonName: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  moneyPerHoursOneToOne: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  moneyPerHoursOneToMany: number

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPaid: boolean
}
