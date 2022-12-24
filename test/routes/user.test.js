const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const randomEmail = require('random-email');

require('dotenv').config();

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

    const res = await request(app)
      .post('/user')
      .send({
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
