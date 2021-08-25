
const mysql = require("mysql");

const dbConexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_mysql_crud_db"
});

dbConexion.connect(function(e){
    if(e){
        console.log("Error al conectarnos a la base de datos")
        throw new Error("Ha ocurrido un error en la conexion a la base de datos")
    }else{
        console.log("Database conectada");
    }
})


module.exports = dbConexion;

