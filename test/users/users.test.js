import mockingoose from 'mockingoose';
import User from '../../models/User.js';
import request from 'supertest';
import app from '../../app.js';

describe('GET /users', () => {
    it('should get all users', async () => {
        mockingoose(User).toReturn(
            [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'mail@abv.bg',
                    phone_number: '34343434',
                    role: 'admin',
                    password: '123admin435',
                },
            ],
            'find'
        );
        const res = await request(app).get('/users');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });
});
