const mockingoose = require('mockingoose');
const Homes = require('../../models/Homes');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const User = require('../../models/User');
const app = require('../../app');

describe('Positive DELETE /home', () => {
    describe('given the request header berer not exist', () => {
        it('should return a 401', async () => {
            const { statusCode } = await request(app).delete(`/home`);
            expect(statusCode).toBe(401);
        });
    });

    describe('given the token is not valid', () => {
        it('should return a 403', async () => {
            const { statusCode } = await request(app)
                .delete(`/home`)
                .set('Authorization', `Bearer Wrong Token`);
            expect(statusCode).toBe(403);
        });
    });

    describe('given the user dosent have permission', () => {
        it('should return a 403', async () => {
            const token = jwt.sign(
                { auth_id: '63c93c7ea886abcac9deefe8', auth_role: 'user' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );
            const { statusCode } = await request(app)
                .delete(`/home`)
                .set('Authorization', `Bearer ${token}`);
            expect(statusCode).toBe(403);
        });
    });

    describe('given the home not exist', () => {
        it('should return a 400', async () => {
            const token = jwt.sign(
                { auth_id: '63c93c7ea886abcac9deefe8', auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            const { statusCode } = await request(app)
                .delete(`/home`)
                .set('Authorization', `Bearer ${token}`)
                .send({ home_id: '652beab54298449b57ff172f' /*wrong id*/ });

            expect(statusCode).toBe(400);
        });
    });

    describe('given the home dosent belong to the user', () => {
        it('should return a 403', async () => {
            const token = jwt.sign(
                { auth_id: '63c93c7ea886abcac7deefe8' /*wrong id*/, auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );
            mockingoose(User).toReturn(
                {
                    _id: '63c93c7ea886abcac9deefe8',
                    first_name: 'test',
                    last_name: 'test',
                    email: 'test@gmail.com',
                    password: '$2b$10$PtuFEjpqdr50hldhr4K36ODgzYKtz6QBO7KxB9OgCgcEP4ihxWuUa',
                    role: 'seller',
                    phone_number: '+112557441454',
                },
                'findOne'
            );
            mockingoose(Homes).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    title: 'Nice house',
                    city: 'Dobrich',
                    neighborhood: 'Drujba',
                    address: 'Blok 42 A 2 8',
                    price: '10000',
                    size: '150',
                    year: '1960',
                    description: 'Really nice house, have 2 rooms',
                    longitude: '30',
                    latitude: '50',
                    owner_id: '63c93c7ea886abcac9deefe8',
                    homeViews: '200',
                },
                'findOne'
            );
            const { statusCode } = await request(app)
                .delete(`/home`)
                .set('Authorization', `Bearer ${token}`)
                .send({ home_id: '652beab54298559b57ff172f' });
            expect(statusCode).toBe(403);
        });
    });

    describe('given the user is logged in', () => {
        it('should delete home by id', async () => {
            const token = jwt.sign(
                { auth_id: '632beab54298559b57ff172f', auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            mockingoose(Homes).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    title: 'Nice house',
                    city: 'Dobrich',
                    neighborhood: 'Drujba',
                    address: 'Blok 42 A 2 8',
                    price: '10000',
                    size: '150',
                    year: '1960',
                    description: 'Really nice house, have 2 rooms',
                    longitude: '30',
                    latitude: '50',
                    owner_id: '632beab54298559b57ff172f',
                    homeViews: '200',
                },
                'findOne'
            );
            mockingoose(Homes).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    title: 'Nice house',
                    city: 'Dobrich',
                    neighborhood: 'Drujba',
                    address: 'Blok 42 A 2 8',
                    price: '10000',
                    size: '150',
                    year: '1960',
                    description: 'Really nice house, have 2 rooms',
                    longitude: '30',
                    latitude: '50',
                    owner_id: '632beab54298559b57ff172f',
                    homeViews: '200',
                },
                'findByIdAndDelete'
            );
            const res = await request(app)
                .delete(`/home`)
                .set('Authorization', `Bearer ${token}`)
                .send({ home_id: '652beab54298559b57ff172f' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual('Home has been deleted');
        });
    });
});
