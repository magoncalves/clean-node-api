import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { SaveSurveyResult } from '@/domain/use-cases/survey-result/save-survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (
      data: SaveSurveyResult.Params
    ): Promise<LoadSurveyResult.Result> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (
      surveyId: string,
      accountId: string
    ): Promise<LoadSurveyResult.Result> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultStub()
}
