const mockingoose = require('mockingoose');
const User = require('../../models/User');
const request = require('supertest');
const app = require('../../app');

describe('Negative test login', () => {
    it('responds 400 if email is null', function(done) {
        request(app)
            .post('/auth/login')
            .send({email: null, password: 'random'})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('responds 400 if password is null', function(done) {
        request(app)
            .post('/auth/login')
            .send({email: 'testuser@gmail.com', password: null})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('responds 400 if no user is found in MongoDB for email', function(done) {
        mockingoose(User).toReturn(
            null,
            'findOne'
        );

        request(app)
            .post('/auth/login')
            .send({email: 'testuser@gmail.com', password: 'password'})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('responds 400 if the password is wrong', function(done) {
        mockingoose(User).toReturn(
            {
                _id: '632beab54298559b57ff172f',
                first_name: 'John',
                last_name: 'Doe',
                email: 'testuser@gmail.com',
                phone_number: '34343434',
                role: 'admin',
                password: 'Wh8JQZMBJBKbyLxl0QecTGlXJgMwbscaDZVvd6q9c8cEblI1JK',
            },
            'findOne'
        );

        request(app)
            .post('/auth/login')
            .send({email: 'testuser@gmail.com', password: 'password'})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

describe('Positive test login', () => {
    it('responds 200 if email and password are correct', function(done) {
        mockingoose(User).toReturn(
            {
                _id: '632beab54298559b57ff172f',
                first_name: 'John',
                last_name: 'Doe',
                email: 'testuser@gmail.com',
                phone_number: '34343434',
                role: 'admin',
                password: '$2b$10$PM5Wh8JQZMBJBKbyLxl0QecTGlXJgMwbscaDZVvd6q9c8cEblI1JK',
            },
            'findOne'
        );

        process.env.JWT_SECRET = "something-super-secret";

        request(app)
            .post('/auth/login')
            .send({email: 'testuser@gmail.com', password: 'password'})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('Positive test logout', () => {
    it('logs out successfully', async function() {
        const res = await request(app)
            .post('/auth/logout').send();

        expect(res.statusCode).toEqual(200);
    });

    it('logs out and sets the cookie token as empty string', async function() {
        const res = await request(app)
            .post('/auth/logout').send();

        const setCookieHeader = await res.header['set-cookie'];
        expect(setCookieHeader[0]).toContain('token=;');
    });
});
