import { Module } from '@nestjs/common'
import { CheckoutService } from './checkout.service'
import { CheckoutController } from './checkout.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from 'src/jwt-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Checkout } from './entities/checkout.entity'
import { User } from 'src/authenticate/entities/user.entity'
import { Absent } from 'src/absent/entities/absent.entity'
import { Bonus } from 'src/bonus/entities/bonus.entity'

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([Checkout, User, Absent, Bonus])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
