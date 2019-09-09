const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Not valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this.id.toString() }, 'thisismynewcourse')
    this.tokens = this.tokens.concat({ token })
    this.save();
    return token
}

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) { 
        throw new Error('unable to login');
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error('unable to login')
        } else {
            return user;
        }
    }
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
})

userSchema.pre('remove', async function(next) {
    await Task.deleteMany({owner: this._id})
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User