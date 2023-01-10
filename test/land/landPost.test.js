import mockingoose from 'mockingoose';
import Land from '../../models/Land.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive POST /land', () => {
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
            'save'
        );
    });

    it('should create a new Land and return it', async () => {
        const res = await request(app).post('/land').send({
            name: 'Zemedelska zemq',
            place: 'Spasovo',
            price: '100000',
            size: '150',
            description: 'Zemedelska zemq purva kategoriq. W blizost do ezero.',
            longitude: '30',
            latitude: '50',
            owner: '632beab54298559b57ff172f',
        });
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual('Zemedelska zemq');
        expect(res.body.place).toEqual('Spasovo');
        expect(res.body.price).toEqual(100000);
        expect(res.body.size).toEqual('150');
        expect(res.body.description).toEqual(
            'Zemedelska zemq purva kategoriq. W blizost do ezero.'
        );
        expect(res.body.longitude).toEqual('30');
        expect(res.body.latitude).toEqual('50');
    });
});
