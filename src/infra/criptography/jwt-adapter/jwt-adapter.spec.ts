import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JWT Adapter', () => {
  it('should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('anhy_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'anhy_id' }, 'secret')
  })
})
