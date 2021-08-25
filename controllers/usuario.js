const dbConexion = require("../bd/config")
const bCriptjs = require("bcryptjs");

const agregarUsuario = (req, res)=>{
    const { first_name, last_name, email, password, phone, organization, designation, salary, status, created_at } = req.body;
    dbConexion.query("SELECT * FROM employees WHERE email =?", email, function(error, data){
        if(error){
            return res.status(400).json({
                msg: "Error al obtener los datos"
            })
        }
        if(data.length > 0){
            return res.status(400).json({
                msg: "Ese correo ya existe en la base de datos"
            })
        }else{
            const salt = bCriptjs.genSaltSync();
            const passwordEncriptada = bCriptjs.hashSync(password, salt);
            const datosGuardados = {
                first_name, 
                last_name, 
                email, 
                password: passwordEncriptada, 
                phone, 
                organization, 
                designation,
                salary, 
                status,
                created_at
            }

            dbConexion.query("INSERT INTO employees SET ?", [datosGuardados], function(error, data){
                if(error){
                    return res.status(400).json({
                        msg: "Error al obtener los datos"
                    })
                }else{
                    console.log(data);
                    return res.status(201).json({
                        msg: "Datos creados correctamente en la base de datos",
                        datosGuardados
                    })
                }
            });
        }

    });
    
}

const obtenerUsuarios = (req, res)=>{
    dbConexion.query("SELECT * FROM employees", function(error, data){
        if(error){
            return res.status(400).json({
                msg: "Error al obtener los datos"
            })
        }
        return res.status(200).json({
            msg: "Datos de los usuarios",
            data
        })
    });
}

const obtnerUsuariosPorId = (req, res)=>{
    const { id } = req.params;
    dbConexion.query("SELECT * FROM employees WHERE id=?",id, function(error, data){
        if(error){
            return res.status(400).json({
                msg: "Error en esa consulta"
            })
        }
        console.log(data);
        if(data.length > 0){
            return res.status(200).json({
                msg:"Dato del usuario",
                data
            })
        }else{
            return res.status(400).json({
                msg: "No existe datos con ese id: "+ id
            })
        }
        
    } );
}


const actualizarUsuarioById = (req, res)=>{
    const id = req.params.id;
    const { first_name,
        last_name,
        phone,
        organization,
        designation,
        salary,
        created_at } = req.body;
    const datoPersona = {
        first_name,
        last_name,
        phone,
        organization,
        designation,
        salary,
        created_at
    }
    dbConexion.query("UPDATE employees SET ? WHERE id=?", [datoPersona,id], function(error, data){
        if(error){
            return res.status(400).json({
                msg: "Error en esa consulta"
            })
        }
        if(data.affectedRows === 0){
            return res.status(400).json({
                msg: `No existe datos con ese id ${id}`
            })
        }
        return res.status(200).json({
            msg: "Datos actualizados correctamente",
            datoPersona
        })
    });
    /* res.json({
        msg: "Actualizar usuario"
    }) */
}

function eliminarUsuarios(req, res){
    const id = req.params.id;
    dbConexion.query("DELETE FROM employees WHERE id=?", id, function(error, data){
        if(error){
            return res.status(400).json({
                msg: "Error en esa consulta"
            })
        }

        if(data.affectedRows > 0){
            return res.status(200).json({
                msg: "Datos eliminados"
            })
        }
        return res.status(400).json({
            msg: `No existen datos con el id ${id}`
            //msg: "No existen datos con el id: " + id
        })
       
    })
}


module.exports = {
    agregarUsuario,
    obtenerUsuarios,
    obtnerUsuariosPorId,
    actualizarUsuarioById,
    eliminarUsuarios
}