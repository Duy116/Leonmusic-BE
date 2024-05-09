import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/authenticate/entities/user.entity'

export const UserEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest()
    return request.currentUser.validateUsername
  },
)
