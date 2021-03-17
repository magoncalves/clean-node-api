import { mockAddAccountParams } from '@/domain/test'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add', () => {
    it('should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(mockAddAccountParams())

      expect(account).toEqual({
        ...mockAddAccountParams(),
        id: expect.anything()
      })
    })
  })

  describe('loadByEmail', () => {
    it('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@email.com')

      expect(account).toEqual({
        ...mockAddAccountParams(),
        id: expect.anything()
      })
    })

    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@email.com')

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken', () => {
    it('should update the account access token on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()

      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })

      expect(account).toBeTruthy()
      expect(account.accessToken).toEqual('any_token')
    })
  })

  describe('loadByToken', () => {
    it('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')

      expect(account).toEqual({
        ...mockAddAccountParams(),
        id: expect.anything(),
        accessToken: 'any_token'
      })
    })

    it('should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toEqual({
        ...mockAddAccountParams(),
        id: expect.anything(),
        accessToken: 'any_token',
        role: 'admin'
      })
    })

    it('should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeNull()
    })

    it('should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')

      expect(account).toEqual({
        ...mockAddAccountParams(),
        id: expect.anything(),
        accessToken: 'any_token',
        role: 'admin'
      })
    })

    it('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')

      expect(account).toBeFalsy()
    })
  })
})
