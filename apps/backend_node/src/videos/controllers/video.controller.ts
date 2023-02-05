import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import * as fs from 'fs'
import { VideoListFilterDto } from '../dto/video-list-filter.dto'
import { VideoListService } from '../services/video-list.service'
import { VideoOptions } from '../dto/video-options.dto'
import { Logger } from '@nestjs/common'
import { Response } from 'express'
import { normalize } from 'path'

@Controller('videos')
export class VideoController {
  private readonly logger: Logger = new Logger(VideoListService.name)

  constructor(private readonly videoListService: VideoListService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  public async listAllFiles(@Query() filter: VideoListFilterDto) {
    return await this.videoListService.getAll(filter.limit, filter.muted)
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  public async create(@Body() dto: VideoOptions) {
    this.logger.log(dto, 'Received data')
    return await this.videoListService.process(dto)
  }

  @Get(':id')
  public downloadAudio(@Param('id') id: string, @Res() response: Response) {
    const path = normalize(`./audio/${id}.mp3`)

    if (path.startsWith('.')) {
      throw new BadRequestException('Invalid video ID')
    }

    if (!fs.existsSync(path)) {
      throw new NotFoundException('Required audio file does not exist')
    }

    return response.download(path, `${id}.mp3`)
  }
}
