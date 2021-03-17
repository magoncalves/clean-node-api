import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import {
  SaveSurveyResult,
  SaveSurveyResultParams
} from '@/domain/use-cases/survey-result/save-survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(mockSurveyResultModel()))
    }
  }

  return new SaveSurveyResultStub()
}
