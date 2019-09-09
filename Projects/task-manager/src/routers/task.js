const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send()
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks)
    } catch(e) {
        res.status(400).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     res.status(201).send(tasks)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get('/tasks/:id', auth, async (req,res) => {
    const id = req.params.id;
    try {
        //const task = await Task.findById(id)
        const task = await Task.findOne({ _id: id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // Task.findById(id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id});
        if(!task) {
            return res.send(404).send()
        }        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save();
        res.status(201).send(task)
    } catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }        
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
}) 

module.exports = router