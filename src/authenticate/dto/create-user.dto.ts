import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { USER_ROLE } from 'src/common/type'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty({ enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role: USER_ROLE

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  born?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string

  @ApiProperty()
  @IsOptional()
  lessonName: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  moneyPerHoursOneToOne: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  moneyPerHoursOneToMany: number
}
