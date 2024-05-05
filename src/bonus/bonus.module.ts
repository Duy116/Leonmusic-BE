import { Module } from '@nestjs/common'
import { BonusService } from './bonus.service'
import { BonusController } from './bonus.controller'
import { jwtConfig } from 'src/jwt-config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bonus } from './entities/bonus.entity'
import { User } from 'src/authenticate/entities/user.entity'

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([Bonus, User])],
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
