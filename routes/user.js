const express = require('express');
const multipart = require('connect-multiparty');
const UserController = require("../controllers/user");

const auth_middleware = require("../middlewares/authenticated");
const upload_middleware = multipart({uploadDir: './uploads'});

const api = express.Router();

api.post("/register", UserController.register);
api.post("/login", UserController.login);
api.put("/upload-avatar/:id", [auth_middleware.ensureAuth, upload_middleware], UserController.uploadAvatar);
api.get("/avatar/:id", [auth_middleware.ensureAuth], UserController.getAvatar);


module.exports = api;
