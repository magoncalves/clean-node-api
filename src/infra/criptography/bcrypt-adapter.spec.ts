import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => resolve('hashed_value'))
  }
}))

const SALT = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(SALT)
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')

    expect(hash).toEqual('hashed_value')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
    const hashPromise = sut.hash('any_value')

    await expect(hashPromise).rejects.toThrow()
  })
})
