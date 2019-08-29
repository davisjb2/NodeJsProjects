//CRUD create read update delete
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log("Unable to connect to database");
    }
    
    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        description: "Learn NodeJS"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    // db.collection('users').deleteMany({
    //     age: 24
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed:false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5d66e00cef40963978263646")
    // }, {
    //     $inc: {
    //         age: +1
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
    // db.collection('users').findOne({_id: new ObjectID("5d66e109b147fa39df06c4d7")}, (error, user) => {
    //     if(error) {
    //         return console.log("Unable to fetch");
    //     } 
    //     console.log(user);
    // })

    // db.collection('users').find({age: 23}).count((error, count) => {
    //     console.log(count);
    // });

    // db.collection('tasks').findOne({_id: new ObjectID("5d66e1b6a0d0cf3a37976f64")}, (error, task) => {
    //     console.log(task);
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     console.log(tasks);
    // })


});


// const id = new ObjectID()
// console.log(id.id.length)
// //console.log(id.getTimestamp());
// console.log(id.toHexString().length)


    // const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Joey',
    //     age: 24
    // }, (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([{
    //     name: 'Brooke',
    //     age: 23
    // },
    // {
    //     name: 'Joey',
    //     age: 24
    // }], (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([{
    //     description: 'Grocery Shopping',
    //     completed: false
    // }, {
    //     description: 'Clean House',
    //     completed: true
    // },{
    //     description: 'Learn NodeJS',
    //     completed: true
    // }], (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert tasks");
    //     }

    //     console.log(result.ops);
    // })
