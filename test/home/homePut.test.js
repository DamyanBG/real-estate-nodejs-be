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
            'findOne'
        );
        mockingoose(Homes).toReturn(
            {
                name: 'Nice house updated',
                place: 'Dobrich updated',
                price: '20000',
                size: '153',
                year: '1961',
                description: 'Really nice house, have 2 rooms, updated',
                longitude: '32',
                latitude: '52',
                owner: '632beab54298559b57ff172f',
            },
            'save'
        );
    });

    it('should update a Home and return it', async () => {
        const res = await request(app).put('/home').send({
            home_id: '63aca8c7826cd2f2bfda5914',
            name: 'Nice house updated',
            place: 'Dobrich updated',
            price: '20000',
            size: '153',
            year: '1961',
            description: 'Really nice house, have 2 rooms, updated',
            longitude: '32',
            latitude: '52',
            owner: '632beab54298559b57ff172f',
        });
        expect(res.status).toEqual(200);
        console.log(res.body._id, 'return body _id');
        expect(res.body.name).toEqual('Nice house updated');
        expect(res.body.place).toEqual('Dobrich updated');
        expect(res.body.price).toEqual(20000);
        expect(res.body.size).toEqual('153');
        expect(res.body.year).toEqual('1961');
        expect(res.body.description).toEqual('Really nice house, have 2 rooms, updated');
        expect(res.body.longitude).toEqual('32');
        expect(res.body.latitude).toEqual('52');
    });
});
