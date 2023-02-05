import { IsIP, IsPort, IsString, IsUrl, ValidateNested, validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'

/// Configuration for Editframe API
export class DotenvEditframeConfig {
  @IsUrl()
  /// URL for Editframe API. Including version.
  url: string
  @IsString()
  clientId: string
  @IsString()
  token: string
}

/// Configuration for REDIS server
export class DotenvRedisConfig {
  @IsIP()
  host: string
  @IsPort()
  port: number
}

/// Configuration for Node Backend Application
export class DotenvBackendConfig {
  @IsPort()
  port: number
}

/// Top-level config - represents .env file
export class DotenvFileConfig {
  @ValidateNested()
  editframe: DotenvEditframeConfig

  @ValidateNested()
  redis: DotenvRedisConfig

  @ValidateNested()
  backend: DotenvBackendConfig
}

/// This function is called from app.model to load configuration from .env file. When configuration is not valid,
/// this function will throw Exception and backend application won't be started.
export async function envFileLoader() {
  const config = plainToClass(DotenvFileConfig, {
    editframe: {
      url: process.env.EDITFRAME_API_URI,
      clientId: process.env.EDITFRAME_CLIENT_ID,
      token: process.env.EDITFRAME_API_TOKEN,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
    backend: {
      port: parseInt(process.env.BACKEND_API_PORT),
    },
  })

  await validateOrReject(config, {
    skipMissingProperties: false,
    skipNullProperties: false,
    skipUndefinedProperties: false,
  })
  return config
}
