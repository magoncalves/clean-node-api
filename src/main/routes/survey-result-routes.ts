/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/savev-survey-result/save-survey-result-controller-factory'
import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController())
  )
}
