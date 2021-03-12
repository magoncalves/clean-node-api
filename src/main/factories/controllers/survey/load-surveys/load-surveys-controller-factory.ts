import { LoadSurveysController } from '@/presentation/controller/survey/load-surveys/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/use-cases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurveys()
  const loadSurveysController = new LoadSurveysController(dbLoadSurveys)

  return makeLogControllerDecorator(loadSurveysController)
}
