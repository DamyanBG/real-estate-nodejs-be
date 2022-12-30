const request = require('supertest');
const Message = require('../../models/Message');
const mockingoose = require('mockingoose');
const app = require('../../app');

describe('Positive POST /message', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        mockingoose(Message).toReturn(
            {
                _id: '63aca8c7826cd2f2bfda5914',
                sender_id: '63aca8c7826cd2f2bfda5915',
                receiver_id: '63aca8c7826cd2f2bfda5919',
                text: 'Hello world',
            },
            'save'
        );
    });

    it('should create a new message and return it', async () => {
        const res = await request(app).post('/message').send({
            sender_id: '63aca8c7826cd2f2bfda5915',
            receiver_id: '63aca8c7826cd2f2bfda5919',
            text: 'Hello world',
        });
        expect(res.status).toEqual(201);
        expect(res.body.sender_id).toEqual('63aca8c7826cd2f2bfda5915');
        expect(res.body.receiver_id).toEqual('63aca8c7826cd2f2bfda5919');
        expect(res.body.text).toEqual('Hello world');
    });
});
