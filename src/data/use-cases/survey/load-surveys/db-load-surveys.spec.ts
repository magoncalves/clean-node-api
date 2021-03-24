import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { mockSurveyModels } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = faker.random.uuid()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')

    await sut.load(accountId)

    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  it('should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const accountId = faker.random.uuid()

    const surveys = await sut.load(accountId)

    expect(surveys).toEqual(mockSurveyModels())
  })

  it('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = faker.random.uuid()
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error())

    const surveysPromise = sut.load(accountId)

    await expect(surveysPromise).rejects.toThrow()
  })
})
