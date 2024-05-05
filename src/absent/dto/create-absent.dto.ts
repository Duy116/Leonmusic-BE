import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateAbsentDto {
  @ApiProperty()
  @IsBoolean()
  makedUp: boolean

  @ApiProperty()
  @IsString()
  date: string

  @ApiProperty()
  @IsString()
  reason: string

  @ApiProperty()
  @IsString()
  userCurrentId: string
}
