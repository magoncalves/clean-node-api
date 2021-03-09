import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeFakeAccount = (): AccountModel | null => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'hashed_password'
})

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return await new Promise((resolve) => resolve('any_value'))
    }
  }

  return new DecrypterStub()
}

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
  implements LoadAccountByTokenRepository {
    async loadByToken (
      token: string,
      role?: string
    ): Promise<AccountModel | null> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  )

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token', 'any_role')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)

    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken'
    )

    await sut.load('any_token', 'any_role')

    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
})
