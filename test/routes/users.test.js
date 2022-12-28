const mockingoose = require('mockingoose')
const User = require('../../models/User')
const request = require('supertest')
const app = require('../../app')


describe('GET /users', () => {
    it('should get all users', async () => {
        mockingoose(User).toReturn([{
            first_name: "John",
            last_name: "Doe",
            email: "mail@abv.bg",
            phone_number: "34343434",
            role: "admin",
            password: "123admin435"
        }], 'find')
        const res = await request(app).get('/users')
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1)
    })
})

