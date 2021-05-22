//rutas para autenticar usuarios
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const auth = require('../middelware/auth')
//crea un usuario
//api/usuarios
router.post('/', 
    authController.autenticarUsuario
)

router.get('/', auth, authController.usuarioAutenticado)

module.exports = router