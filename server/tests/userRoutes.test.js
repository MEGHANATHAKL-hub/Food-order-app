const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { router, setUsersCollection } = require('../routes/userRoutes');

let mongod, app, db, client, usersCollection;

// Before all tests, start the in-memory MongoDB server
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    usersCollection = db.collection('users');

    // Inject mock usersCollection into userRoutes for testing
    setUsersCollection(usersCollection);

    // Initialize the express app with middleware and routes
    app = express();
    app.use(bodyParser.json());
    app.use('/api/users', router);
});

// After all tests, stop MongoDB and close the connection
afterAll(async () => {
    await client.close();
    await mongod.stop();
});

// Test case for creating a user
describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                age: 30
            });

        expect(response.status).toBe(201);
        // expect(response.body).toHaveProperty('_id');
        // expect(response.body.name).toBe('John Doe');
        // expect(response.body.email).toBe('john@example.com');
        // expect(response.body.age).toBe(30);
    });
});

// Test case for getting all users
describe('GET /api/users', () => {
    it('should return all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

// Test case for getting a user by ID
describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
        const user = await usersCollection.insertOne({
            name: 'Jane Doe',
            email: 'jane@example.com',
            age: 25
        });
        const response = await request(app).get(`/api/users/${user.insertedId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Jane Doe');
    });

    it('should return 404 for non-existing user', async () => {
        const response = await request(app).get('/api/users/507f191e810c19729de860ea');
        expect(response.status).toBe(404);
    });
});

// Test case for updating a user
describe('PUT /api/users/:id', () => {
    it('should update a user by id', async () => {
        const user = await usersCollection.insertOne({
            name: 'Alice',
            email: 'alice@example.com',
            age: 28
        });
        const response = await request(app)
            .put(`/api/users/${user.insertedId}`)
            .send({ name: 'Alice Updated', age: 29 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User updated');

        const updatedUser = await usersCollection.findOne({ _id: user.insertedId });
        expect(updatedUser.name).toBe('Alice Updated');
        expect(updatedUser.age).toBe(29);
    });
});

// Test case for deleting a user
describe('DELETE /api/users/:id', () => {
    it('should delete a user by id', async () => {
        const user = await usersCollection.insertOne({
            name: 'Bob',
            email: 'bob@example.com',
            age: 35
        });
        const insertedId = user.insertedId
        console.log(user, insertedId)
        const response = await request(app).delete(`/api/users/${insertedId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted');

        const deletedUser = await usersCollection.findOne({ _id: user.insertedId });
        expect(deletedUser).toBeNull();
    });
});