import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

// const makeSut = (): AccountMongoRepository => {
//   //
// }

describe('Account Mondo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(account).toEqual({
      id: expect.anything(),
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
})
