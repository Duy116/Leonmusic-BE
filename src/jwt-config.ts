import { ConfigModule, ConfigService } from '@nestjs/config'
import { SecurityConfig } from 'src/common/configs/config.interface'

export const jwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const securityConfig = configService.get('security') as SecurityConfig
    return {
      secret: securityConfig.accessSecret,
    }
  },
}
