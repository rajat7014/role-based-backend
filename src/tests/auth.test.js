import request from 'supertest'
import app from '../src/server'

describe('POST /auth/signup', () => {
  it('Should return 200', async () => {
    const res = await request(app).post('/auth/signup').send({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      role: 'User',
    })

    expect(res.status).toBe(200)
  })
})
