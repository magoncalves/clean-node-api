import { Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | null {
    const errors = this.validations.map((validation) =>
      validation.validate(input)
    )

    const error = errors.find((error) => error instanceof Error)
    if (error) {
      return error
    }
    return null
  }
}
