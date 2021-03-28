import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'
import { AddSurvey } from '@/domain/use-cases/survey/add-survey'

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

const makeSurveyRequest = (): AddSurvey.Params => ({
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

describe('Survey Routes', () => {
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

  describe('POST /survey', () => {
    it('should return 204 on add survey with valid access token and role', async () => {
      const password = await hash('123', 12)
      const res = await accountCollection.insertOne({
        name: 'Murillo',
        email: 'murillogoncalves@gmail.com',
        password,
        role: 'admin'
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

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeSurveyRequest())
        .expect(204)
    })

    it('should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeSurveyRequest())
        .expect(403)
    })

    it('should return 403 on add survey with invalid access token', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Murillo',
        email: 'murillogoncalves@gmail.com',
        password,
        role: 'admin',
        accessToken: 'invalid_access_token'
      })

      await request(app)
        .post('/api/surveys')
        .send(makeSurveyRequest())
        .expect(403)
    })

    it('should return 403 on add survey with valid access token and invalid role', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeSurveyRequest())
        .expect(403)
    })
  })

  describe('GET /surveys', () => {
    it('should return 403 on load surveys without access token', async () => {
      await request(app).get('/api/surveys').expect(403)
    })

    it('should return 204 on load surveys with valid access token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
