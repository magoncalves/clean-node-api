import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { mockAccountModel } from '@/domain/test'
import {
  AddAccount,
  AddAccountParams
} from '@/domain/use-cases/account/add-account'
import {
  Authentication,
  AuthenticationParams
} from '@/domain/use-cases/account/authentication'
import { LoadAccountByToken } from '@/domain/use-cases/account/load-account-by-token'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (
      authentication: AuthenticationParams
    ): Promise<AuthenticationModel> {
      return await Promise.resolve({
        accessToken: 'any_token',
        name: 'any_name'
      })
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (
      accessToken: string,
      role?: string
    ): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenStub()
}
