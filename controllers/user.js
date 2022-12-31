const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../services/jwt");


async function register(req, resp) {
    const user = new User(req.body);
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            throw {msg: "El email y el password son obligatorios"};
        } 
        const foundEmail = await User.findOne({email});
        if (foundEmail) throw {msg: "El email ya está en uso"};
        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(password, salt);
        user.save();
        resp.status(200).send(user);
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


async function login(req, resp) {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) throw {msg: "Email o contraseña incorrectos"};
        const passwordSuccess = await bcrypt.compare(password, user.password);
        if (!passwordSuccess) throw {msg: "Login incorrecto"};
        const token = jwt.createToken(user);
        resp.status(200).send({token});
    }
    catch(error) {
        resp.status(500).send(error);
    }
}


async function uploadAvatar(req, resp) {
    User.findById(req.params.id, (err, userData) => {
        if (err) {
            resp.status(500).send(err);
        }
        if (!userData) {
            resp.status(400).send({msg: "Usuario no encontrado"});
        }
        if (req.files) {
                const filePath = req.files.avatar.path;
                const fileName = filePath.split("\\")[1];
                const extension = fileName.split(".")[1];
                if (extension!=="png" && extension!=="jpg") {
                    resp.status(400).send({msg: "Archivo inválido"});
                }
                else {
                    userData.avatar = fileName;
                    User.findByIdAndUpdate(req.params.id, userData, (err, result) => {
                        if (err) {
                            resp.status(500).send({msg: "Se produjo un error"});
                        }
                        if (!result) {
                            resp.status(400).send({msg: "No se pudo actualizar la información de usuario"});
                        }
                        resp.status(200).send({msg: "Información de usuario actualizada"});
                    });
                }
        }       
    });    
}



function getAvatar(req, resp) {
    User.findById(req.params.id, (err, userData) => {
        if (err) {
            resp.status(500).send({msg: "Se produjo un error"});
        }
        const filePath = `./uploads/${userData.avatar}`;
        fs.stat(filePath, (err, stat) => {
            if (err) {
                resp.status(404).send({msg: "El avatar no existe"});
            }
            resp.sendFile(path.resolve(filePath));
        });
    });
}


module.exports = { register, login, uploadAvatar, getAvatar }