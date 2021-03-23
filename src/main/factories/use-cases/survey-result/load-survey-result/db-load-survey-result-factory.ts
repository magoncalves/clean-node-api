import { DbLoadSurveyResult } from '@/data/use-cases/survey-result/load-survey-result/db-load-survey-result'
import { LoadSurveyResult } from '@/domain/use-cases/survey-result/load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveyResult = new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository
  )

  return dbLoadSurveyResult
}
