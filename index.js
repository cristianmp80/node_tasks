const mongoose = require("mongoose");
const config = require("config");
const app = require("./app");
const port = process.env.PORT || 3000;
const urlMongodb = config.get("db");


mongoose.connect(urlMongodb, {useNewUrlParser: true, useUnifiedTopology: true}, (err, resp) => {
    try {
        if (err) {
            throw err;
        }
        else {
            console.log("La conexión a la bbdd se realizó con éxito.");
            app.listen(port, () => {
                console.log("El servidor está funcionando en http://localhost:" + port);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
    

});
