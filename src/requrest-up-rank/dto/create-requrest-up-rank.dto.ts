import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, IsUrl } from 'class-validator'
import { RANK_TYPE } from 'src/common/type'

export class CreateRequrestUpRankDto {
  @ApiProperty()
  @IsString()
  userCurrentId: string

  @ApiProperty({ enum: RANK_TYPE })
  @IsString()
  rankType: RANK_TYPE

  @ApiProperty()
  @IsNumber()
  rankValue: number

  @ApiProperty()
  @IsUrl()
  mediaLink: string
}
