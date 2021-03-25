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
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 50,
      isCurrentAccountAnswer: true
    },
    {
      answer: 'another_answer',
      image: 'any_image',
      count: 10,
      percent: 80,
      isCurrentAccountAnswer: false
    }
  ],
  date: new Date()
})
