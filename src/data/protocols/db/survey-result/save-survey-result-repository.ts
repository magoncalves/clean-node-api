import { SaveSurveyResultParams } from '@/domain/use-cases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (surveyResultData: SaveSurveyResultParams) => Promise<void>
}
