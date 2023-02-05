import { IsHexColor, IsNotEmpty, IsNumber, IsString, IsUrl, Min, ValidateNested } from 'class-validator'

export class Position {
  @IsNumber(undefined, { message: 'X coordinate needs to be numerical' })
  x = 0

  @IsNumber(undefined, { message: 'Y coordinate needs to be numerical' })
  y = 0
}

export class TextLayerOptions {
  @IsHexColor({ message: 'Text color needs to be in hex.' })
  color: string

  @IsString({ message: 'Text value needs to be string.' })
  @IsNotEmpty({ message: 'Text value is required' })
  value: string

  @IsNumber(undefined, { message: 'Text size must bee a number' })
  @Min(10, { message: 'Text size must be at least 10' })
  size: number

  @ValidateNested()
  position: Position
}

export class VideoOptions {
  @IsUrl(undefined, { message: 'Audio URL must be a link' })
  audioUrl: string

  @IsUrl(undefined, { message: 'Image URL must be a link' })
  imageUrl: string

  @ValidateNested()
  text: TextLayerOptions
}
