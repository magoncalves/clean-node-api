import { SignUpController } from '@/presentation/controller/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/use-cases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/use-cases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signupController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )

  return makeLogControllerDecorator(signupController)
}
