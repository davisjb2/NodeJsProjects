const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

router.post('/users' , async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.status(201).send(users)
    // } catch(e) {
    //     res.status(400).send(e)
    // }
    // User.find({}).then((users) => {
    //     res.status(201).send(users)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// router.get('/users/:id', async (req,res) => {
//     const id = req.params.id;
//     try {
//         const user = await User.findById(id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }

//     // User.findById(id).then((user) => {
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user);
//     // }).catch((error) => {
//     //     res.status(400).send(error)
//     // })
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
        //const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(201).send(req.user)
    } catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user) {
        //     return res.status(404).send()
        // }
        const user = await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name)
        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e)
    }
}) 

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true);
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error("User not found")
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router