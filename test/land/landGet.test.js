const mockingoose = require('mockingoose');
const Land = require('../../models/Land');
const User = require('../../models/User');
const request = require('supertest');
const app = require('../../app');

describe('Positive GET /land', () => {
    it('should get land by id', async () => {
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
        mockingoose(Land).toReturn(
            {
                _id: '652beab54298559b57ff172f',
                name: 'Zemedelska zemq',
                place: 'Spasovo',
                price: '100000',
                size: '150',
                description: 'Zemedelska zemq purva kategoriq. W blizost do ezero.',
                longitude: "30",
                latitude: '50',
                owner: "632beab54298559b57ff172f",
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
                longitude: "30",
                latitude: '50',
                owner: "632beab54298559b57ff172f",
            },
            'save'
        );
        const res = await request(app).get(`/land/652beab54298559b57ff172f`);

        expect(res.statusCode).toEqual(200);
        
    });
});
