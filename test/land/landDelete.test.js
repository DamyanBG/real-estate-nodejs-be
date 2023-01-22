const mockingoose = require('mockingoose');
const Land = require('../../models/Land');
const User = require('../../models/User');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');

describe('Positive DELETE /land', () => {
    describe('given the request header berer not exist', () => {
        it('should return a 401', async () => {
            const { statusCode } = await request(app).delete(`/land`);
            expect(statusCode).toBe(401);
        });
    });

    describe('given the token is not valid', () => {
        it('should return a 403', async () => {
            const { statusCode } = await request(app)
                .delete(`/land`)
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
                .delete(`/land`)
                .set('Authorization', `Bearer ${token}`);
            expect(statusCode).toBe(403);
        });
    });

    describe('given the land not exist', () => {
        it('should return a 400', async () => {
            const token = jwt.sign(
                { auth_id: '63c93c7ea886abcac9deefe8', auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            const { statusCode } = await request(app)
                .delete(`/land`)
                .set('Authorization', `Bearer ${token}`)
                .send({ land_id: '652beab54298449b57ff172f' /*wrong id*/ });

            expect(statusCode).toBe(400);
        });
    });

    describe('given the land dosent belong to the user', () => {
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
            mockingoose(Land).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    name: 'Zemedelska zemq',
                    place: 'Spasovo',
                    price: '100000',
                    size: '150',
                    description: 'Zemedelska zemq purva kategoriq. W blizost do ezero.',
                    longitude: '30',
                    latitude: '50',
                    owner: '63c93c7ea886abcac9deefe8',
                },
                'findOne'
            );
            const { statusCode } = await request(app)
                .delete(`/land`)
                .set('Authorization', `Bearer ${token}`)
                .send({ land_id: '652beab54298559b57ff172f' });
            expect(statusCode).toBe(403);
        });
    });

    describe('given the user is logged in', () => {
        it('should delete land by id', async () => {
            const token = jwt.sign(
                { auth_id: '63c93c7ea886abcac9deefe8', auth_role: 'seller' },
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
            mockingoose(Land).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    name: 'Zemedelska zemq',
                    place: 'Spasovo',
                    price: '100000',
                    size: '150',
                    description: 'Zemedelska zemq purva kategoriq. W blizost do ezero.',
                    longitude: '30',
                    latitude: '50',
                    owner: '63c93c7ea886abcac9deefe8',
                },
                'findOne'
            );
            mockingoose(Land).toReturn(
                {
                    _id: '652beab54298559b57ff172f',
                    name: 'Zemedelska zemq',
                    place: 'Spasovo',
                    price: '100000',
                    size: '150',
                    description: 'Zemedelska zemq purva kategoriq. W blizost do ezero.',
                    longitude: '30',
                    latitude: '50',
                    owner: '63c93c7ea886abcac9deefe8',
                },
                'findByIdAndDelete'
            );

            const res = await request(app)
                .delete(`/land`)
                .set('Authorization', `Bearer ${token}`)
                .send({ land_id: '652beab54298559b57ff172f' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual('Land has been deleted');
        });
    });
});
