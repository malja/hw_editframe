import { IsBoolean, IsNumber, Max, Min } from 'class-validator'

export class VideoListFilterDto {
  @IsNumber({ allowNaN: false, allowInfinity: false }, { always: true, message: 'limit must be numerical' })
  @Min(1, { always: true, message: 'limit must be a positive number.' })
  @Max(1000, { always: true, message: 'limit must be lower than 1000.' })
  public limit = 10

  @IsBoolean()
  public muted = false
}
