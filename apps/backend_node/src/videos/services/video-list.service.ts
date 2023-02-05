import { ForbiddenException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VideoListResponse } from '../dto/video-list-response.interface'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map, tap } from 'rxjs'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { VideoOptions } from '../dto/video-options.dto'

@Injectable()
export class VideoListService {
  private readonly logger: Logger = new Logger(VideoListService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectQueue('video-compose') private readonly videoQueue: Queue,
  ) {}

  public async getAll(limit: number, muted: boolean): Promise<VideoListResponse> {
    const request = this.httpService
      .get('/videos', {
        params: {
          limit,
          muted,
        },
        headers: {
          Authorization: `Bearer ${this.configService.getOrThrow('editframe.token')}`,
        },
      })
      .pipe(
        tap(response => this.logger.log(response.status)),
        map(response => response.data),
      )
      .pipe(
        catchError(error => {
          this.logger.error(error)
          throw new ForbiddenException('Communication with Editframe API server failed', { cause: error })
        }),
      )

    return (await firstValueFrom(request)) as VideoListResponse
  }

  public async process(dto: VideoOptions) {
    const { id, timestamp } = await this.videoQueue.add(dto)
    return { id, timestamp }
  }
}
