const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult} = require('express-validator')

//crear una nueva tarea

exports.crearTarea = async(req, res) =>{
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertence al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json({tarea})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) =>{
    try {
        //Extraer el proyecto y comprobar si existe
        const proyecto = req.params.proyecto

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Revisar si el proyecto actual pertence al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //obtener tareas
        const tareas = await Tarea.find({proyecto})
        res.json({tareas})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo error')
    }
}

//Actualizar una terea
exports.actualizarTareas = async (req, res) =>{
    try {
        //Revisar si la tarea existe
        const {proyecto, nombre, estado} = req.body

        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            return res.status(401).json({ msg:'No existe esa tarea'})
        }
          
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si el proyecto actual pertence al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }
        //crear un objeto con la nueva informacion
        const nuevaTarea ={}
        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado

        //Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true})
        res.json({tarea})
  
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo error')
    }
}

//eliminar tarea
exports.eliminarTarea = async (req, res) =>{
    try {
        //Revisar si la tarea existe
        const {proyecto} = req.query

        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            return res.status(401).json({ msg:'No existe esa tarea'})
        }
          
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        
        //Revisar si el proyecto actual pertence al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }
        
        //Eliminar Tarea
        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea Eliminada'})
  
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo error')
    }
}