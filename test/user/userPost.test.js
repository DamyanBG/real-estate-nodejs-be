import mockingoose from 'mockingoose';
import User from '../../models/User.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive POST /user', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose(User).toReturn(
            {
                _id: '63aca8c7826cd2f2bfda5914',
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                password: 'password',
                role: 'admin',
                phone_number: '123-456-7890',
            },
            'save'
        );
    });

    it('should create a new user and return it', async () => {
        const res = await request(app).post('/user').send({
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            password: 'password',
            role: 'admin',
            phone_number: '123-456-7890',
        });
        expect(res.status).toEqual(201);
        console.log(res.body._id, 'return body _id');
        expect(res.body.first_name).toEqual('Test');
        expect(res.body.last_name).toEqual('User');
        expect(res.body.email).toEqual('test@example.com');
        expect(res.body.password).toEqual(undefined);
    });
});

describe('Negative POST /user', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose(User).toReturn(
            {
                _id: '63aca8c7826cd2f2bfda5914',
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                password: 'password',
                role: 'admin',
                phone_number: '123-456-7890',
            },
            'save'
        );
    });
    it('should return status code 400', async () => {
        const res = await request(app).post('/user').send({
            last_name: 'User',
            email: 'test@example.com',
            password: 'password',
            role: 'admin',
            phone_number: '123-456-7890',
        });
        expect(res.status).toEqual(400);
    });
});
