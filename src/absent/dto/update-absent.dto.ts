import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateAbsentDto } from './create-absent.dto'
import { IsString } from 'class-validator'

export class UpdateAbsentDto extends PartialType(CreateAbsentDto) {
  @ApiProperty()
  @IsString()
  id: string
}
