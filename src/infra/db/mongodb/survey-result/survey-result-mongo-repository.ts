import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SaveSurveyResultModel } from '@/domain/use-cases/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (
    surveyResultData: SaveSurveyResultModel
  ): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults'
    )
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: surveyResultData.surveyId,
        accountId: surveyResultData.accountId
      },
      {
        $set: {
          answer: surveyResultData.answer,
          date: surveyResultData.date
        }
      },
      {
        upsert: true,
        returnOriginal: false
      }
    )

    return res.value && MongoHelper.map(res.value)
  }
}
