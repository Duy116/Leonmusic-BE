import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { User } from 'src/authenticate/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      })

      const user = await this.userRepo.findOne({
        where: {
          id: payload.id,
        },
      })

      if (!user) {
        console.log('Not found user', user.id)
        throw new UnauthorizedException()
      }

      request['currentUser'] = payload
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
