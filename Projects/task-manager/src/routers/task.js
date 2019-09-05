const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks' , async (req, res) => {
    const task = new Task(req.body)

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

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        res.status(400).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     res.status(201).send(tasks)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get('/tasks/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id)
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

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation)
    {
        return res.status(400).send({error: "Invalid updates!"})
    }
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if(!task) {
            return res.send(404).send()
        }
        res.status(201).send(task)
    } catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id)
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
}) 

module.exports = router