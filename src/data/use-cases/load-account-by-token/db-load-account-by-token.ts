import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/use-cases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
