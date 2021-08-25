
const express = require("express");
const dbConexion = require("../bd/config.js");

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            login: '/auth/login',  //http://localhost:4002/auth/login
            usuario: '/auth/user'
        };

        this.connectDb();
        this.middlewares();
        this.routes();
        
    }

    async connectDb(){
        await dbConexion;
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.paths.login, require("../routes/auth"));
        this.app.use(this.paths.usuario, require("../routes/usuario"))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server is running in the port ${this.port}`);
        });
    }

}

module.exports = Server;