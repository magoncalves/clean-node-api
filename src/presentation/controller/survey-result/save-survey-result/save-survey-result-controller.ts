import { LoadSurveyById } from '@/domain/use-cases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import {
  forbidden,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = request.params
      const { answer } = request.body
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const answers = survey.answers.map((a) => a.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
