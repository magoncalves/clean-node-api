import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

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
        .post('/api/survey')
        .set('x-access-token', accessToken)
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
        .expect(204)
    })

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

  it('should return 403 on add survey with valid access token and invalid role', async () => {
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

    await request(app)
      .post('/api/survey')
      .set('x-access-token', accessToken)
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
