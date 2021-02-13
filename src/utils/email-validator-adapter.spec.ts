import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailValid = sut.isValid('invalid_email')

    expect(isEmailValid).toBe(false)
  })
})
