import mockingoose from 'mockingoose';
import User from '../../models/User.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive PUT /user', () => {
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
                first_name: 'UpdatedTest',
                last_name: 'UpdatedUser',
                email: 'updated_test@example.com',
                password: 'password',
                role: 'user',
                phone_number: '123-456-78901',
            },
            'save'
        );
    });

    it('should update a user and return it', async () => {
        const res = await request(app).put('/user').send({
            user_id: '63aca8c7826cd2f2bfda5914',
            first_name: 'UpdatedTest',
            last_name: 'UpdatedUser',
            email: 'updated_test@example.com',
            password: 'password',
            role: 'user',
            phone_number: '123-456-78901',
        });
        expect(res.status).toEqual(200);
        console.log(res.body._id, 'return body _id');
        expect(res.body.first_name).toEqual('UpdatedTest');
        expect(res.body.last_name).toEqual('UpdatedUser');
        expect(res.body.email).toEqual('updated_test@example.com');
        expect(res.body.password).toEqual(undefined);
        expect(res.body.phone_number).toEqual('123-456-78901');
    });
});
