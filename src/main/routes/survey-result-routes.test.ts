import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import request from 'supertest'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import env from '../config/env'
import { AddSurveyParams } from '@/domain/use-cases/survey/add-survey'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const password = await hash('123', 12)
  const res = await accountCollection.insertOne({
    name: 'Murillo',
    email: 'murillogoncalves@gmail.com',
    password
  })

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: id
    },
    {
      $set: {
        accessToken
      }
    }
  )

  return accessToken
}

const makeSurveyRequest = (): AddSurveyParams => ({
  question: 'Question',
  answers: [
    {
      image: 'https://image-name.com',
      answer: 'Answer 1'
    },
    {
      answer: 'Answer 2'
    }
  ],
  date: new Date()
})

describe('SurveyResult Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on save survey result without access token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    it('should return 200 on save survey result with access token', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne(makeSurveyRequest())

      await request(app)
        .put(`/api/surveys/${res.ops[0]._id as string}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    it('should return 403 on save survey result without access token', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403)
    })

    it('should return 200 on load survey result with access token', async () => {
      const accessToken = await makeAccessToken()
      const res = await surveyCollection.insertOne(makeSurveyRequest())

      await request(app)
        .get(`/api/surveys/${res.ops[0]._id as string}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
