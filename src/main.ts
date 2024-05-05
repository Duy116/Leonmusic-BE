import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type {
  CorsConfig,
  SwaggerConfig,
  NestConfig,
} from 'src/common/configs/config.interface'
import { NestExpressApplication } from '@nestjs/platform-express'

import { join } from 'path'
import session from 'express-session'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  app.use(
    session({
      secret: 'squarely-app',
      resave: false,
      saveUninitialized: false,
    }),
  )

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const corsConfig = configService.get('cors') as CorsConfig
  const swaggerConfig = configService.get('swagger') as SwaggerConfig
  const nestConfig = configService.get('nest') as NestConfig

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(swaggerConfig.path, app, document)
  }

  // CORS
  if (corsConfig.enabled) {
    app.set('trust proxy', true)

    app.enableCors({
      origin: corsConfig.origin.split(','),
      credentials: true,
    })
  }

  await app.listen(nestConfig.port)
}

void bootstrap().catch((err) => console.error(err))
