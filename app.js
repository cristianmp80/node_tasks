const express = require("express");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar rutas
const task_routes = require("./routes/task");
const user_routes = require("./routes/user");

//Rutas base
app.use("/api", task_routes);
app.use("/api", user_routes);


module.exports = app;