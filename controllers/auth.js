//const dbConexion = require("../bd/config")

const dbConexion = require("../bd/config");
const bCripjs = require("bcryptjs");
const { generarJWT } = require("../helpers/gener-jwt");

const loginUsuario = (req, res)=>{
    const { email, password } = req.body;
    dbConexion.query("SELECT * FROM employees WHERE email =?", email, async function(error, data){
        if(data.length === 0){
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectas"
            })
        }else{
            const passwordDb = data[0].password;
            const id = data[0].id;
            const token = await generarJWT(id);
            if(token){
                const comparePassword = bCripjs.compareSync(password, passwordDb);
                if(comparePassword){
                    res.status(200).json({
                        datoPersona: data[0],
                        token
                    })
                }else{
                    return res.status(400).json({
                        msg: "Usuario o contraseñas incorrectas"
                    })
                }
            }
          
        }


    });
}

module.exports = {
    loginUsuario,
}