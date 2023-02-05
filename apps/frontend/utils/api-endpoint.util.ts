import urlJoin from 'url-join'

export function apiEndpoint(url: string) {
  const config = useRuntimeConfig()
  console.log('Have Config', config)

  return urlJoin(config.apiRoot, url)
}
