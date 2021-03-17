import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/use-cases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(mockSurveyResultModel()))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
