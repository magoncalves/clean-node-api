import { DbAddSurvey } from '@/data/use-cases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/use-cases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbAddSurvey = new DbAddSurvey(surveyMongoRepository)

  return dbAddSurvey
}
