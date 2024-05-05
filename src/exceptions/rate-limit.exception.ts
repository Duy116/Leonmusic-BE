import { HttpStatus, HttpException } from '@nestjs/common'

export class RateLimitException extends HttpException {
  constructor(retryAfter: number) {
    super(
      `Rate limit exceeded. Retry after ${retryAfter} seconds`,
      HttpStatus.TOO_MANY_REQUESTS,
    )

    this.retryAfter = retryAfter
  }

  readonly retryAfter: number
}
