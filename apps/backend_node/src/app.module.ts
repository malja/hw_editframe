import { VideoModule } from './videos/video.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { envFileLoader } from './config/loader'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [async () => envFileLoader()],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    VideoModule,
  ],
})
export class AppModule {}
