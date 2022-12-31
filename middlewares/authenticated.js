const moment = require("moment");
const jwt = require("../services/jwt");


function ensureAuth(req, resp, next) {
    if (!req.headers.authorization) {
        return resp.status(403).send({msg: "La operación requiere autenticación"});
    }
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        const payload = jwt.decodeToken(token);
        if (payload.exp <= moment().unix()) {
            resp.status(400).send({msg: "Token expirado"});
        }
        req.user = payload;
        next();
    }
    catch(error) {
        resp.status(400).send({msg: "Token inválido"});
    }
}


module.exports = { ensureAuth };