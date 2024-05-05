import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateBonusDto } from './create-bonus.dto'
import { IsString } from 'class-validator'

export class UpdateBonusDto extends PartialType(CreateBonusDto) {
  @ApiProperty()
  @IsString()
  id: string
}
