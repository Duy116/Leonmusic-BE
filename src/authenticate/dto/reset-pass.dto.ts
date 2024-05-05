import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ResetPassDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  password: string
}
