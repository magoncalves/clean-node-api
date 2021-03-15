import { SaveSurveyResultModel } from '@/domain/use-cases/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResultRepository {
  save: (surveyResultData: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
