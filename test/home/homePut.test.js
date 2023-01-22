const mockingoose = require('mockingoose');
const jwt = require('jsonwebtoken');
const Homes = require('../../models/Homes');
const request = require('supertest');
const User = require('../../models/User');
const app = require('../../app');

describe('Positive PUT /home', () => {
    beforeEach(() => {
        mockingoose.resetAll();
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
                home_id: '63aca8c7826cd2f2bfda5914',
                title: 'Nice house Updated',
                city: 'Dobrich updated',
                neighborhood: 'Drujba updated',
                address: 'Blok 42 A 2 8 updated',
                size: '153',
                year: '1961',
                description: 'Really nice house, have 2 rooms, updated',
                longitude: '32',
                latitude: '52',
                owner_id: '632beab54298559b57ff172f',
            },
            'save'
        );
    });

    describe('given the request header berer not exist', () => {
        it('should return a 401', async () => {
            const { statusCode } = await request(app).put(`/home`);
            expect(statusCode).toBe(401);
        });
    });

    describe('given the token is not valid', () => {
        it('should return a 403', async () => {
            const { statusCode } = await request(app)
                .put(`/home`)
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
                .put(`/home`)
                .set('Authorization', `Bearer ${token}`);
            expect(statusCode).toBe(403);
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
            const { statusCode } = await request(app)
                .put(`/home`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    home_id: '652beab54298559b57ff172f',
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
                });
            expect(statusCode).toBe(403);
        });
    });

    describe('given the user is logged in and the land belong to him or his the admin', () => {
        it('should update a Home and return it', async () => {
            const token = jwt.sign(
                { auth_id: '632beab54298559b57ff172f', auth_role: 'seller' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            const res = await request(app)
                .put('/home')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    home_id: '63aca8c7826cd2f2bfda5914',
                    title: 'Nice house Updated',
                    city: 'Dobrich updated',
                    neighborhood: 'Drujba updated',
                    address: 'Blok 42 A 2 8 updated',
                    price: '20000',
                    size: '153',
                    year: '1961',
                    description: 'Really nice house, have 2 rooms, updated',
                    longitude: '32',
                    latitude: '52',
                    owner_id: '632beab54298559b57ff172f',
                });
            expect(res.status).toEqual(200);
            expect(res.body.title).toEqual('Nice house Updated');
            expect(res.body.city).toEqual('Dobrich updated');
            expect(res.body.neighborhood).toEqual('Drujba updated');
            expect(res.body.address).toEqual('Blok 42 A 2 8 updated');
            expect(res.body.price).toEqual('20000');
            expect(res.body.size).toEqual('153');
            expect(res.body.year).toEqual('1961');
            expect(res.body.description).toEqual('Really nice house, have 2 rooms, updated');
            expect(res.body.longitude).toEqual('32');
            expect(res.body.latitude).toEqual('52');
        });
    });
});
