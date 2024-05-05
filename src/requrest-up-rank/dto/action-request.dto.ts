import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class ActionRequrestDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsBoolean()
  action: boolean
}
