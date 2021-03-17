import { AddAccountParams } from '@/data/use-cases/account/add-account/db-add-account-protocols'
import { AuthenticationParams } from '@/data/use-cases/account/authentication/db-authentication-protocols'
import { AccountModel } from '@/presentation/middlewares/auth-middleware-protocols'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel | null => ({
  ...mockAddAccountParams(),
  id: 'any_id'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
