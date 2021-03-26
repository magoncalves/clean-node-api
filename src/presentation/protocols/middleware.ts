import { HttpResponse } from './http'

export interface Middleware {
  handle: (request) => Promise<HttpResponse>
}
