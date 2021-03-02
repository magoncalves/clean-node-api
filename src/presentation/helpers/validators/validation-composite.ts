import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

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
