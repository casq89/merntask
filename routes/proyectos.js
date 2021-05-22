const express = require('express')
const router = express.Router()
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middelware/auth')
const {check} = require('express-validator')
//crea proyuectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre' , 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

//obtener proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

//actualizar proyecto
router.put('/:id',
    auth,
    [
        check('nombre' , 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
    )

module.exports = router