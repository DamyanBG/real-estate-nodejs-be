const mockingoose = require('mockingoose');
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
    });

    it('should update a Land and return it', async () => {
        const res = await request(app).put('/land').send({
            land_id: "652beab54298559b57ff172f",
            name: 'Zemedelska zemq updated',
            place: 'Rogozina',
            price: '200000',
            size: '250',
            description: 'Zemedelska zemq vtora kategoriq. W blizost do seloto.',
            longitude: "35",
            latitude: '55',
            owner: "632beab54298559b57ff172f",
        });
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Zemedelska zemq updated');
        expect(res.body.place).toEqual('Rogozina');
        expect(res.body.price).toEqual(200000);
        expect(res.body.size).toEqual('250');
        expect(res.body.description).toEqual('Zemedelska zemq vtora kategoriq. W blizost do seloto.');
        expect(res.body.longitude).toEqual('35');
        expect(res.body.latitude).toEqual('55');
    });
});
