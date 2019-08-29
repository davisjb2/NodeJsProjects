const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
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
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//             if(!validator.isEmail(value)) {
//                 throw new Error('Not valid email')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(value.includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Jessica',
//     age: 23,
//     email: 'b.cookie199@yahoo.com',
//     password: 'passwooooooooord'
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// });