const { Router } = require("express");
const { check  } = require("express-validator");
const router = Router();
const { agregarUsuario, obtenerUsuarios, obtnerUsuariosPorId, actualizarUsuarioById, eliminarUsuarios } = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validar-campos");

router.post("/", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],agregarUsuario)

router.get("/", obtenerUsuarios);

router.get("/:id", obtnerUsuariosPorId);

router.put("/:id", actualizarUsuarioById);

router.delete("/:id", eliminarUsuarios);

module.exports = router;