import {
  SaveSurveyResultParams,
  SurveyResultModel
} from '@/data/use-cases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  ...mockSaveSurveyResultParams(),
  id: 'any_id'
})
