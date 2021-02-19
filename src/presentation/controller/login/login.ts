import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email')))
      )
    }

    if (!httpRequest.body.password) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return await new Promise((resolve) =>
        resolve(badRequest(new InvalidParamError('email')))
      )
    }

    return await new Promise((resolve) => resolve(ok({})))
  }
}
