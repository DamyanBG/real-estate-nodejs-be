import mockingoose from 'mockingoose';
import Message from '../../models/Message.js';
import request from 'supertest';
import app from '../../app.js';

describe('Positive GET /message', () => {
    it('should get messages for a conversation between two users', async () => {
        mockingoose(Message).toReturn(
            [
                {
                    _id: '63aca8c7826cd2f2bfda5914',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'Hello world',
                },
                {
                    _id: '63ae005ea70c90a9c1a64a64',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'How are you?',
                },
                {
                    _id: '63ae006ab3495418916ca996',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'Fine',
                },
                {
                    _id: '63ae0071b5f7b599b0e12004',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'And you',
                },
                {
                    _id: '63ae007919b93ee04110c926',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'You welcome',
                },
                {
                    _id: '63ae008085c5f08b8cd461e5',
                    sender_id: '63aca8c7826cd2f2bfda5915',
                    receiver_id: '63aca8c7826cd2f2bfda5919',
                    text: 'Glad to see you',
                },
                {
                    _id: '63ae00863c6f2e3cc1e0add7',
                    sender_id: '63aca8c7826cd2f2bfda5919',
                    receiver_id: '63aca8c7826cd2f2bfda5915',
                    text: 'Bla bla bla',
                },
                {
                    _id: '63ae009a90f2a59f6c96cd67',
                    sender_id: '63aca8c7826cd2f2bfda5919',
                    receiver_id: '63aca8c7826cd2f2bfda5915',
                    text: 'aewaef f waef ',
                },
                {
                    _id: '63ae0094d64ee412a271a673',
                    sender_id: '63aca8c7826cd2f2bfda5919',
                    receiver_id: '63aca8c7826cd2f2bfda5915',
                    text: 'KFIOAjfoa092304',
                },
            ],
            'find({sender_id: "63aca8c7826cd2f2bfda5915", receiver_id: "63aca8c7826cd2f2bfda5919"})'
        );
        const res = await request(app).get(
            `/message/63aca8c7826cd2f2bfda5915&63aca8c7826cd2f2bfda5919`
        );

        expect(res.statusCode).toEqual(200);
    });
});
