import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppService } from './app.service'
import { HealthcheckConfig } from './common/configs/config.interface'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('healthcheck')
  healthcheck(): HealthcheckConfig | undefined {
    return this.configService.get<HealthcheckConfig>('healthcheck')
  }
}
