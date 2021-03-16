import { LoadSurveyById } from '@/domain/use-cases/survey/load-survey-by-id'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(request.params.surveyId)
    return null
  }
}
