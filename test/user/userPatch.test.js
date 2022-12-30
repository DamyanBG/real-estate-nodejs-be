const request = require('supertest');
const User = require('../../models/User');
const mockingoose = require('mockingoose');
const app = require('../../app');

describe('Positive PATCH /user/profile', () => {
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
            'findOne'
        );
        mockingoose(User).toReturn(
            {
                first_name: 'Testov',
                last_name: 'Userov',
                phone_number: '123-456-78901',
            },
            'save'
        );
    });

    it('should update a user profile and return it', async () => {
        const res = await request(app).patch('/user/profile').send({
            user_id: '63aca8c7826cd2f2bfda5914',
            first_name: 'Testov',
            last_name: 'Userov',
            phone_number: '123-456-78901',
        });
        expect(res.status).toEqual(200);
        expect(res.body.first_name).toEqual('Testov');
        expect(res.body.last_name).toEqual('Userov');
        expect(res.body.password).toEqual(undefined);
        expect(res.body.phone_number).toEqual('123-456-78901');
    });
});

describe('Positive PATCH /user/password', () => {
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
            'findOne'
        );
        mockingoose(User).toReturn(
            {
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                password: 'password123',
                role: 'admin',
                phone_number: '123-456-7890',
            },
            'save'
        );
    });

    it('should update a user password and return it', async () => {
        const res = await request(app).patch('/user/password').send({
            user_id: '63aca8c7826cd2f2bfda5914',
            password: 'password123',
        });
        expect(res.status).toEqual(200);
        expect(res.body.password).toEqual(undefined);
    });
});

describe('Positive PATCH /user/email', () => {
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
            'findOne'
        );
        mockingoose(User).toReturn(
            {
                first_name: 'Test',
                last_name: 'User',
                email: 'updated_test@example.com',
                password: 'password123',
                role: 'admin',
                phone_number: '123-456-7890',
            },
            'save'
        );
    });

    it('should update a user email and return it', async () => {
        const res = await request(app).patch('/user/email').send({
            user_id: '63aca8c7826cd2f2bfda5914',
            email: 'updated_test@example.com',
        });
        expect(res.status).toEqual(200);
        expect(res.body.email).toEqual('updated_test@example.com');
    });
});
