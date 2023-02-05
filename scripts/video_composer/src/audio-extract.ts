import {spawnSync} from "child_process";

export async function audioExtract(filePath: string, outPath: string): Promise<boolean> {
  console.log('Starting audio extraction on file: ', filePath, 'outputing to: ', outPath)

  const child = spawnSync('ffmpeg', ['-i', filePath, '-vn', outPath])
  if (child.status !== 0) {
    throw new Error('Audio extraction failed')
  }

  return true
}
