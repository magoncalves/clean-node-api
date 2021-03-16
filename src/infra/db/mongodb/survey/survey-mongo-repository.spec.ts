import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
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

  describe('add', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'another_answer'
          }
        ],
        date: new Date()
      })

      const survey = await surveyCollection.findOne({
        question: 'any_question'
      })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll', () => {
    it('should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
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
          question: 'another_question',
          answers: [
            {
              image: 'another_image',
              answer: 'another_answer'
            }
          ],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toEqual(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[1].question).toEqual('another_question')
    })

    it('should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toEqual(0)
    })
  })

  describe('loadById', () => {
    it('should load a survey by id on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      })
      const id = res.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)

      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
