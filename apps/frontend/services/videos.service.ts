import { SimpleVideoComposerOptions } from '@ef/video_composer'
import { apiEndpoint } from '~/utils/api-endpoint.util'

export async function videosCreate(options: SimpleVideoComposerOptions) {
  return await useFetch(apiEndpoint('/videos'), {
    method: 'POST',
    body: options,
  })
}

export async function videosGetAll() {
  return await useFetch(apiEndpoint('/videos'))
}
