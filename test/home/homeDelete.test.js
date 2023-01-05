const mockingoose = require('mockingoose');
const Homes = require('../../models/Homes');
const request = require('supertest');
const app = require('../../app');

describe('Positive DELETE /home', () => {
    it('should delete home by id', async () => {
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
            'findByIdAndDelete'
        );
        const res = await request(app)
            .delete(`/home`)
            .send({ home_id: '652beab54298559b57ff172f' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('Home has been deleted');
    });
});
