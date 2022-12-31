const jwt = require("jsonwebtoken");
const config = require("config");

const SECRET_KEY = config.get("secret_key");

function createToken(user, expiresIn) {
    const {name, email} = user;
    const payload = {name, email};
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
}


function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}


module.exports = { createToken, decodeToken };