import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Survey Routes', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /survey', () => {
    it('should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/survey')
        .send({
          question: 'Question',
          answers: [
            {
              image: 'https://image-name.com',
              answer: 'Answer 1'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(403)
    })
  })
})
