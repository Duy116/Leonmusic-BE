export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  healthcheck: HealthcheckConfig
  security: SecurityConfig
  database: DatabaseConfig
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
  origin: string
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}

export interface HealthcheckConfig {
  appName: string
  environment: string
  version: string
}

export interface SecurityConfig {
  accessSecret: string
  refreshSecret: string
  bcryptSaltOrRound: string | number
}

export interface DatabaseConfig {
  url: string
}
