const Task = require("../models/task");

async function createTask(req, resp) {
    const task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    try {
        const taskStore = await task.save();
        if (!taskStore) {
            resp.status(400).send({msg: "No pudo guardarse la tarea"});
        }
        else {
            resp.status(200).send({task: taskStore});
        }
    }
    catch(error) {
        resp.status(500).send(error);
    }
}

async function getTasks(req, resp) {
    try {
        const taskList = await Task.find().sort({created_at: -1});
        if (!taskList) {
            resp.status(400).send({msg: "No se encontraron tareas"});
        }
        else {
            resp.status(200).send(taskList);
        }
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


async function getTaskById(req, resp) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            resp.status(400).send({msg: "No se encontró la tarea"});
        }
        else {
            resp.status(200).send(task);
        }
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


async function updateTask(req, resp) {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        if (!task) {
            resp.status(400).send({msg: "No se encontró la tarea"});
        }
        else {
            resp.status(200).send(task);
        }
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


async function deleteTask(req, resp) {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        if (!task) {
            resp.status(400).send({msg: "No se encontró la tarea"});
        }
        else {
            resp.status(200).send(task);
        }
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };