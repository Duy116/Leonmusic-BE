import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const FieldMapRequest = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const value = request[data]

    return value
  },
)
