import {PushConfig, PushConfigSchema} from '../../../api/graphql/push_config.js'
import {AppInterface} from '../../../models/app/app.js'
import {ensureAuthenticatedPartners} from '@shopify/cli-kit/node/session'
import {partnersRequest} from '@shopify/cli-kit/node/api/partners'
import {AbortError} from '@shopify/cli-kit/node/error'
import {renderSuccess} from '@shopify/cli-kit/node/ui'
import {OutputMessage} from '@shopify/cli-kit/node/output'
import {relativePath} from '@shopify/cli-kit/node/path'

export interface Options {
  app: AppInterface
}

export async function pushConfig(options: Options) {
  const token = await ensureAuthenticatedPartners()
  const mutation = PushConfig

  const {configuration} = options.app
  const configFileName = relativePath(options.app.directory, options.app.configurationPath)

  if (!configuration.clientId) {
    abort(`${configFileName} does not contain a client_id.`)
  }
  const variables = {apiKey: configuration.clientId, ...configuration}
  const result: PushConfigSchema = await partnersRequest(mutation, token, variables)

  if (result.appUpdate.userErrors.length > 0) {
    const errors = result.appUpdate.userErrors.map((error) => error.message).join(', ')
    abort(errors)
  }

  renderSuccess({
    headline: `Updated app configuration for ${configuration.name}`,
    body: [`${configFileName} configuration is now live on Shopify.`],
  })
}

const abort = (errorMessage: OutputMessage) => {
  throw new AbortError(errorMessage)
}
