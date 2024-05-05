import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator'
import { CHECKOUT_TYPE } from 'src/common/type'

export class UpdateCheckOutDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsDateString()
  timeCheckout: Date

  @ApiProperty({ enum: CHECKOUT_TYPE })
  @IsEnum(CHECKOUT_TYPE)
  type: CHECKOUT_TYPE

  @ApiProperty()
  @IsBoolean()
  isMakeupTime: boolean
}
