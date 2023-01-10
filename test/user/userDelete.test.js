import mockingoose from 'mockingoose';
import User from '../../models/User.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive DELETE /user', () => {
    it('should delete user by id', async () => {
        mockingoose(User).toReturn(
            {
                _id: '632beab54298559b57ff172f',
                first_name: 'John',
                last_name: 'Doe',
                email: 'mail@abv.bg',
                phone_number: '34343434',
                role: 'admin',
                password: '123adminsffe',
            },
            'findOne'
        );
        mockingoose(User).toReturn(
            {
                _id: '632beab54298559b57ff172f',
                first_name: 'John',
                last_name: 'Doe',
                email: 'mail@abv.bg',
                phone_number: '34343434',
                role: 'admin',
                password: '123adminsffe',
            },
            'deleteOne'
        );
        const res = await request(app)
            .delete(`/user`)
            .send({ user_id: '632beab54298559b57ff172f' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Account has been deleted');
    });
});
