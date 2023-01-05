const mockingoose = require('mockingoose');
const Homes = require('../../models/Homes');
const request = require('supertest');
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

    it('should update a Home and return it', async () => {
        const res = await request(app).put('/home').send({
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
