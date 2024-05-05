import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateCheckOutDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  timeCheckout: string

  @ApiProperty()
  @IsString()
  userCheckoutId: string

  @ApiProperty()
  @IsBoolean()
  isMakeupTime: boolean
}
