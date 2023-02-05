export class VideoDetail {
  id: string
  is_ready: boolean
  is_failed: boolean
  duration: number
  download_url: string
  stream_url: string
  metadata: unknown
  timestamp: number
}

export class VideoListResponse {
  links: unknown
  meta: unknown
  data: VideoDetail[]
}
