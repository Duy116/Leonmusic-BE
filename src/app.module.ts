import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from 'src/common/configs/config'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { eventConfig } from './event-config'
import { AuthenticateModule } from './authenticate/authenticate.module'
import { CheckoutModule } from './checkout/checkout.module';
import { RequrestUpRankModule } from './requrest-up-rank/requrest-up-rank.module';
import { BonusModule } from './bonus/bonus.module';
import { AbsentModule } from './absent/absent.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      username: process.env.USER,
      password: process.env.PASS,
      database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(eventConfig),
    AuthenticateModule,
    CheckoutModule,
    RequrestUpRankModule,
    BonusModule,
    AbsentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
