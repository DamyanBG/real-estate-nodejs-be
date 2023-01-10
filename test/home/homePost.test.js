import mockingoose from 'mockingoose';
import Homes from '../../models/Homes.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive POST /home', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose(Homes).toReturn(
            {
                _id: '652beab54298559b57ff172f',
                name: 'Nice house',
                place: 'Dobrich',
                price: '10000',
                size: '150',
                year: '1960',
                description: 'Really nice house, have 2 rooms',
                longitude: '30',
                latitude: '50',
                owner: '632beab54298559b57ff172f',
                homeViews: '200',
            },
            'save'
        );
    });

    it('should create a new Home and return it', async () => {
        const res = await request(app).post('/home').send({
            name: 'Nice house',
            place: 'Dobrich',
            price: '10000',
            size: '150',
            year: '1960',
            description: 'Really nice house, have 2 rooms',
            longitude: '30',
            latitude: '50',
            owner: '632beab54298559b57ff172f',
        });
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual('Nice house');
        expect(res.body.place).toEqual('Dobrich');
        expect(res.body.price).toEqual(10000);
        expect(res.body.size).toEqual('150');
        expect(res.body.year).toEqual('1960');
        expect(res.body.description).toEqual('Really nice house, have 2 rooms');
        expect(res.body.longitude).toEqual('30');
        expect(res.body.latitude).toEqual('50');
    });
});
