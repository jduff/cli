import {BetaFlag} from '../services/dev/fetch.js'

export interface Organization {
  id: string
  businessName: string
  website?: string
}

export interface MinimalOrganizationApp {
  id: string
  title: string
  apiKey: string
}

export type OrganizationApp = MinimalOrganizationApp & {
  organizationId: string
  apiSecretKeys: {
    secret: string
  }[]
  appType?: string
  newApp?: boolean
  grantedScopes: string[]
  applicationUrl: string
  redirectUrlWhitelist: string[]
  requestedAccessScopes?: string[]
  developmentStorePreviewEnabled?: boolean
  betas?: BetaFlag[]
}

export interface OrganizationStore {
  shopId: string
  link: string
  shopDomain: string
  shopName: string
  transferDisabled: boolean
  convertableToPartnerTest: boolean
}
