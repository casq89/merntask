const express = require('express')
const router = express.Router()
const tareaController = require('../controllers/tareaController')
const auth = require('../middelware/auth')
const {check} = require('express-validator')
//crea Tareas
//api/tareas
router.post('/',
    auth,
    [
        check('nombre' , 'El nombre del tarea es obligatorio').not().isEmpty(),
        check('proyecto' , 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

router.get('/:proyecto',
    auth,
    tareaController.obtenerTareas
)

router.put('/:id',
    auth,
    tareaController.actualizarTareas
)

//Eliminar un proyecto
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
    )

module.exports = router