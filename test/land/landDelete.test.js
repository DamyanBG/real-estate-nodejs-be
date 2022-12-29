const mockingoose = require('mockingoose');
const Land = require('../../models/Land');
const request = require('supertest');
const app = require('../../app');

describe('Positive DELETE /land', () => {
    it('should delete land by id', async () => {
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
            'findByIdAndDelete'
        );
        const res = await request(app).delete(`/land`).send({land_id: "652beab54298559b57ff172f"});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Land has been deleted');
    });
});
