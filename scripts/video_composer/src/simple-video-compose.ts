import { SimpleVideoComposerOptions } from './types/simple-video-composer-options.interface'
import { Editframe } from '@editframe/editframe-js'
import { CompositionResult } from './types/composition-result.interface'

export async function simpleVideoCompose(
  client: Editframe,
  options: SimpleVideoComposerOptions,
): Promise<CompositionResult> {
  const defaults: SimpleVideoComposerOptions = {
    audioUrl: '',
    text: {
      value: 'Hello World!',
      position: {
        x: 0,
        y: 0,
      },
      size: 15,
      color: '#FF0000',
    },
    imageUrl: '',
  }

  options = Object.assign(defaults, options)

  console.log('Composition options', options)

  const composition = await client.videos.new({
    duration: 7,
    dimensions: {
      width: 800,
      height: 600,
    },
  })

  composition.addText(
    {
      text: options.text.value,
      color: options.text.color,
      fontSize: options.text.size,
    },
    {
      position: options.text.position,
    },
  )

  composition.addAudio(options.audioUrl)

  composition.addImage(options.imageUrl, {
    size: {
      width: 400,
      height: 300,
    },
    position: {
      x: 'center',
      y: 'top',
    },
  })

  const response = await composition.encodeSync()

  if (!response.isReady || response.isFailed) {
    throw new Error('Video was not processed properly')
  }

  return {
    url: response.downloadUrl,
    id: response.id,
  }
}
