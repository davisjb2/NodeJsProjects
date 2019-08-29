const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Make Dinner',
    completed: false
});

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error);
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Jessica',
//     age: 23
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// });