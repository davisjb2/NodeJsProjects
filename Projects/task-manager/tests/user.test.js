const request = require('supertest');
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Brooke',
        email: 'b.cookie199@yahoo.com',
        password: 'pass1234'
    }).expect(201);
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
})

test('Should not login non-existent user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'pass1234'
    }).expect(400);
})

test('Should get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

