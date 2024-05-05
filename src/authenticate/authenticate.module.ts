import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthenticateService } from './authenticate.service'
import { AuthenticateController } from './authenticate.controller'
import { jwtConfig } from 'src/jwt-config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([User])],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class AuthenticateModule {}
