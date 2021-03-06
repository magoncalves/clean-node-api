import {
  noContent,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveys
} from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)
      return surveys?.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
