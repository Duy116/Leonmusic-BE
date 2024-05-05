import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { User } from './user.entity'

export class LoginSuccess {
  @ApiProperty()
  @IsString()
  accessToken: string

  @ApiProperty({ type: User })
  user: User
}
