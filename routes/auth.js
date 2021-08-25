const { Router } = require("express");
const { check  } = require("express-validator");

const { loginUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginUsuario);

module.exports = router;