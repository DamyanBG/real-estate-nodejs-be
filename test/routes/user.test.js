import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import randomEmail from 'random-email';
import userService from '../../services/userService';
import * as jest from 'jest';
import dotenv from 'dotenv';
dotenv.config();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
    first_name: 'Jane',
    last_name: 'Doe',
    role: 'user',
};

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /user', () => {
    it('should create a new user with valid input', async () => {
        const email = randomEmail({ domain: 'example.com' });
        const firstName = 'John';
        const lastName = 'Doe';
        const password = 'password';
        const role = 'user';
        const phoneNumber = '1234567890';

        const res = await request(app).post('/user').send({
            email,
            first_name: firstName,
            last_name: lastName,
            password,
            role,
            phone_number: phoneNumber,
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', email);
        expect(res.body).toHaveProperty('first_name', firstName);
        expect(res.body).toHaveProperty('last_name', lastName);
        expect(res.body).toHaveProperty('role', role);
        expect(res.body).toHaveProperty('phone_number', phoneNumber);
    });
});

describe('GET /user', () => {
    it('should get a user with id', async () => {
        console.log(userService.findUserById, 'userService function');
        jest.spyOn(userService, 'findUserById').mockReturnValueOnce(userPayload);

        const { statusCode, body } = await request(app).get('/user').send({ user_id: userId });

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);
    });
});
