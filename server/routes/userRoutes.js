const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const DB_CONNECTION_URI = 'mongodb+srv://mongo:mongodb@cluster0.ojpzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(DB_CONNECTION_URI);

let db, usersCollection;

// Connect to mongodb
async function connectToMongo() {
    try {
        await client.connect();
        db = client.db('users-data');
        usersCollection = db.collection('users');
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

connectToMongo()

// If usersCollection is injected for testing, use it; otherwise, use the main one
function setUsersCollection(collection) {
    usersCollection = collection;
}

// CREATE a User
router.post('/', async (req, res) => {
    try {
        const newUser = await usersCollection.insertOne(req.body);
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})

// READ all users
router.get('/', async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// READ single user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await usersCollection.findOne({
            _id: new ObjectId(req.params.id) 
        });
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// UPDATE a user by ID
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await usersCollection.updateOne(
                { _id: new ObjectId(req.params.id) }, 
                { $set: req.body }
            );
        if(updateUser.matchedCount > 0) {
            res.json({ message: 'User updated'})
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// DELETE a user by ID
router.put('/:id', async (req, res) => {
    try {
        const deletedUser = await usersCollection.deleteOne({
            _id: new ObjectId(req.params.id) 
        });
        if(deletedUser.deleteCount > 0) {
            res.json({ message: 'User deleted'});
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = { router, setUsersCollection };