import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateBonusDto {
  @ApiProperty()
  @IsString()
  reason: string

  @ApiProperty()
  @IsNumber()
  amount: number

  @ApiProperty()
  @IsString()
  userCurrentId: string
}
