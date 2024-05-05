import { Module } from '@nestjs/common'
import { AbsentService } from './absent.service'
import { AbsentController } from './absent.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from 'src/jwt-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Absent } from './entities/absent.entity'
import { User } from 'src/authenticate/entities/user.entity'

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([Absent, User])],
  controllers: [AbsentController],
  providers: [AbsentService],
})
export class AbsentModule {}
