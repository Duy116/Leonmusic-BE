import { HttpException, HttpStatus } from '@nestjs/common'

export const throwError = (message: string) => {
  throw new HttpException(message, HttpStatus.BAD_REQUEST)
}

export const throwUnknowError = (message: string) => {
  throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
}
