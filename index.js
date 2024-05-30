import bodyParser from 'body-parser';
import express from 'express';
import { ObjectId } from 'mongodb';
import client from './db.js';

const app = express()

app.use(bodyParser.json())

app.get('/', async (req, res) => {


    console.log('conectandose a la DB')
    await client.connect()
    console.log('DB conectada')

    const db = client.db('sample_mflix')
    console.log('Connected successfully to server')
    const collection = db.collection('users')

    const users = await collection.find({}).toArray()

    await client.close();

    res.json({

        mensaje: 'hola mundo',
        users: users
    })
})

app.get('/:id', async (req, res) => {

    console.log(req.params)
    console.log(req.query)

    await client.connect()

    const db = client.db('sample_mflix')
    console.log('Connected successfully to server')
    const collection = db.collection('users')

    const id = new ObjectId('59b99db4cfa9a34dcd7885b6')
    const user = await collection.findOne({"_id": id})

    await client.close();


    res.json({
        message: "hola",
        user: user
    })
})

app.post('/', async (req, res) => {

    console.log(req.body)
    let user = req.body

    await client.connect()

    const db = client.db('test')
    console.log('Connected successfully to server')
    const collection = db.collection('users')

    // user['_id'] = new ObjectId(uuidv4())
    // console.log(user['_id'])
    // const id = new ObjectId('59b99db4cfa9a34dcd7885b6')
    await collection.insertOne(user)

    await client.close();

    res.json({
        message: 'user created'
    })
})

app.put('/:id', async (req, res) => {

    const body = req.body
    const params = req.params
    await client.connect()

    const db = client.db('sample_mflix')
    console.log('conectado a la base de datos')
    const usuarios = db.collection('users')

    const id = new ObjectId(params.id)
    console.log(id)

    await usuarios.updateOne(
        {
            '_id': id
        }, 
        {
            '$set': {
                username: body.username,
                email: body.email
            }
        }
    )

    await client.close();

    res.json({
        message: 'usuario actualizado'
    })
})

app.delete('/:id', async (req, res) => {

    const params = req.params

    await client.connect()

    const db = client.db('sample_mflix')
    const users = db.collection('users')

    const id = new ObjectId(params.id.toString())
    console.log(id)

    const deleted = await users.deleteOne({'_id': id})
    console.log(deleted.deletedCount)

    await client.close();

    res.json({
        message: 'usuario eliminado'
    })


})

app.listen(3000, () => {
    console.log('api escuchando en el puerto 3000')
})

export default app