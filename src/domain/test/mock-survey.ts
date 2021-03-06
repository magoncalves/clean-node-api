import { AddSurveyParams } from '@/data/use-cases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '@/presentation/controller/survey/load-surveys/load-surveys-controller-protocols'

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

export const mockSurveyModels = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  },
  {
    id: 'another_id',
    question: 'another_question',
    answers: [
      {
        image: 'another_image',
        answer: 'another_answer'
      }
    ],
    date: new Date()
  }
]

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})
