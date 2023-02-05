import { CompositionResult } from './types/composition-result.interface'
import Downloader from 'nodejs-file-downloader'

export async function videoDownload(video: CompositionResult): Promise<string> {
  const downloader = new Downloader({
    fileName: `${video.id}.mp4`,
    url: video.url,
    maxAttempts: 3,
    directory: './downloads',
  })

  const result = await downloader.download()
  if (result.downloadStatus !== 'COMPLETE') {
    throw new Error('Video download failed')
  }

  return result.filePath
}
