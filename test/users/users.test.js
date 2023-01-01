const mockingoose = require('mockingoose');
const User = require('../../models/User');
const request = require('supertest');
const app = require('../../app');

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

describe('GET /users/roleUsers', () => {
    it('should get all users with role user', async () => {
        mockingoose(User).toReturn(
            [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'mail@abv.bg',
                    phone_number: '34343434',
                    role: 'user',
                    password: '123admin435',
                },
                {
                    first_name: 'Petar',
                    last_name: 'Doe',
                    email: 'petar@abv.bg',
                    phone_number: '34343434',
                    role: 'user',
                    password: '123admin435',
                },
                {
                    first_name: 'Stefan',
                    last_name: 'Doe',
                    email: 'stefan@abv.bg',
                    phone_number: '34343434',
                    role: 'user',
                    password: '123admin435',
                },
            ],
            'find'
        );
        const res = await request(app).get('/users/roleUsers');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
});

describe('GET /users/roleBrokers', () => {
    it('should get all users with role broker', async () => {
        mockingoose(User).toReturn(
            [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'mail@abv.bg',
                    phone_number: '34343434',
                    role: 'broker',
                    password: '123admin435',
                },
                {
                    first_name: 'Petar',
                    last_name: 'Doe',
                    email: 'petar@abv.bg',
                    phone_number: '34343434',
                    role: 'broker',
                    password: '123admin435',
                },
                {
                    first_name: 'Stefan',
                    last_name: 'Doe',
                    email: 'stefan@abv.bg',
                    phone_number: '34343434',
                    role: 'broker',
                    password: '123admin435',
                },
            ],
            'find'
        );
        const res = await request(app).get('/users/roleBrokers');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
});

describe('GET /users/roleAdmins', () => {
    it('should get all users with role broker', async () => {
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
                {
                    first_name: 'Petar',
                    last_name: 'Doe',
                    email: 'petar@abv.bg',
                    phone_number: '34343434',
                    role: 'admin',
                    password: '123admin435',
                },
                {
                    first_name: 'Stefan',
                    last_name: 'Doe',
                    email: 'stefan@abv.bg',
                    phone_number: '34343434',
                    role: 'admin',
                    password: '123admin435',
                },
            ],
            'find'
        );
        const res = await request(app).get('/users/roleAdmins');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
});
