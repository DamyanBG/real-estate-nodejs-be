const mockingoose = require('mockingoose');
const jwt = require('jsonwebtoken');
const Land = require('../../models/Land');
const request = require('supertest');
const app = require('../../app');

describe('Positive PUT /land', () => {
    beforeEach(() => {
        mockingoose.resetAll();
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
                owner: '632beab54298559b57ff172f',
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
                owner: '632beab54298559b57ff172f',
            },
            'save'
        );
    });

    describe('given the request header berer not exist', () => {
        it('should return a 401', async () => {
            const { statusCode } = await request(app).put(`/land`);
            expect(statusCode).toBe(401);
        });
    });

    describe('given the token is not valid', () => {
        it('should return a 403', async () => {
            const { statusCode } = await request(app)
                .put(`/land`)
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
                .put(`/land`)
                .set('Authorization', `Bearer ${token}`);
            expect(statusCode).toBe(403);
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
            const { statusCode } = await request(app)
                .put(`/land`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    land_id: '652beab54298559b57ff172f',
                    name: 'Zemedelska zemq updated',
                    place: 'Rogozina',
                    price: '200000',
                    size: '250',
                    description: 'Zemedelska zemq vtora kategoriq. W blizost do seloto.',
                    longitude: '35',
                    latitude: '55',
                    owner: '632beab54298559b57ff172f',
                });
            expect(statusCode).toBe(403);
        });
    });

    describe('given the user is logged in and the land belong to him or his the admin', () => {
        it('should update a Land and return it', async () => {
            const token = jwt.sign(
                { auth_id: '632beab54298559b57ff172f', auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );
            const res = await request(app)
                .put('/land')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    land_id: '652beab54298559b57ff172f',
                    name: 'Zemedelska zemq updated',
                    place: 'Rogozina',
                    price: '200000',
                    size: '250',
                    description: 'Zemedelska zemq vtora kategoriq. W blizost do seloto.',
                    longitude: '35',
                    latitude: '55',
                    owner: '632beab54298559b57ff172f',
                });
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('Zemedelska zemq updated');
            expect(res.body.place).toEqual('Rogozina');
            expect(res.body.price).toEqual(200000);
            expect(res.body.size).toEqual('250');
            expect(res.body.description).toEqual(
                'Zemedelska zemq vtora kategoriq. W blizost do seloto.'
            );
            expect(res.body.longitude).toEqual('35');
            expect(res.body.latitude).toEqual('55');
        });
    });
});
