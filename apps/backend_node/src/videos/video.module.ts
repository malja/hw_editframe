import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { VideoListService } from './services/video-list.service'
import { VideoController } from './controllers/video.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow<string>('redis.host'),
          port: configService.getOrThrow<number>('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'video-compose',
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('editframe.url'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [VideoListService],
  controllers: [VideoController],
})
export class VideoModule {}
