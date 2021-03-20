import {
  badRequest,
  unauthorized,
  notFound,
  serverError,
  forbidden
} from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    ApiKeyAuth: {
      apikeyAuth: apiKeyAuthSchema
    }
  },
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError
}
