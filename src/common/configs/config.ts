import type { Config } from './config.interface'

const config: Config = {
  nest: {
    port: Number(process.env.PORT) ?? 4000,
  },
  cors: {
    enabled: process.env.ENABLED === 'true' ?? false,
    origin: process.env.CORS_ORGIN ?? '',
  },
  swagger: {
    enabled: true,
    title: 'Guitar manager api',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  healthcheck: {
    appName: 'guitar',
    environment: process.env.NODE_ENV ?? 'development',
    version: 'v0.0.5',
  },
  security: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? '',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
    bcryptSaltOrRound: 10,
  },
  database: {
    url: process.env.DATABASE_URL ?? '',
  },
}

export default (): Config => config
