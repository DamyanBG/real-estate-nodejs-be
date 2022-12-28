const mockingoose = require('mockingoose');
const Homes = require('../../models/Homes');
const User = require('../../models/User');
const request = require('supertest');
const app = require('../../app');

describe('Positive GET /home', () => {
    it('should get home by id', async () => {
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
        mockingoose(Homes).toReturn(
            {
                _id: '652beab54298559b57ff172f',
                name: 'Nice house',
                place: 'Dobrich',
                price: '10000',
                size: '150',
                year: '1960',
                description: 'Really nice house, have 2 rooms',
                longitude: "30",
                latitude: '50',
                owner: "632beab54298559b57ff172f",
                homeViews: "200",
            },
            'findOne'
        );
        mockingoose(Homes).toReturn(
            {
                _id: '652beab54298559b57ff172f',
                name: 'Nice house',
                place: 'Dobrich',
                price: '10 000',
                size: '150',
                year: '1960',
                description: 'Really nice house, have 2 rooms',
                longitude: "30",
                latitude: '50',
                owner: "632beab54298559b57ff172f",
                homeViews: "200",
            },
            'save'
        );
        const res = await request(app).get(`/home/652beab54298559b57ff172f`);

        expect(res.statusCode).toEqual(200);
        
    });
});
