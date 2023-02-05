import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { BullAdapter, ExpressAdapter, createBullBoard } from '@bull-board/express'
import Bull from 'bull'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    cors: {
      origin: '*',
    },
  })
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  const config = app.get(ConfigService)

  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/admin/queues')

  const q = new Bull('video-compose')

  createBullBoard({
    queues: [new BullAdapter(q)],
    serverAdapter,
  })

  app.use('/admin/queues', serverAdapter.getRouter())

  await app.listen(config.getOrThrow<number>('backend.port'))
}

bootstrap()
