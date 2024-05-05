import { Module } from '@nestjs/common'
import { RequrestUpRankService } from './requrest-up-rank.service'
import { RequrestUpRankController } from './requrest-up-rank.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from 'src/jwt-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequrestUpRank } from './entities/requrest-up-rank.entity'
import { User } from 'src/authenticate/entities/user.entity'

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([RequrestUpRank, User])],
  controllers: [RequrestUpRankController],
  providers: [RequrestUpRankService],
})
export class RequrestUpRankModule {}
