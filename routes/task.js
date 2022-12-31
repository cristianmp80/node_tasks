const express = require('express');
const TaskController = require("../controllers/task");
const auth_middleware = require("../middlewares/authenticated");

const api = express.Router();

api.post("/task", [auth_middleware.ensureAuth], TaskController.createTask);
api.get("/task", [auth_middleware.ensureAuth], TaskController.getTasks);
api.get("/task/:id", [auth_middleware.ensureAuth], TaskController.getTaskById);
api.put("/task/:id", [auth_middleware.ensureAuth], TaskController.updateTask);
api.delete("/task/:id", [auth_middleware.ensureAuth], TaskController.deleteTask);


module.exports = api;