import { SaveSurveyResult } from '@/domain/use-cases/survey-result/save-survey-result'
import { LoadSurveyById } from '@/domain/use-cases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import {
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = request.params
      const { answer } = request.body
      const { accountId } = request
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const answers = survey.answers.map((a) => a.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
