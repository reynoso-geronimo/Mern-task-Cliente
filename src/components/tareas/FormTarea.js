import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext=useContext(proyectoContext)
    const {proyecto}= proyectosContext
    
    const tareasContext=useContext(tareaContext)
    const {tareaseleccionada, agregarTarea, validarTarea, errortarea,obtenerTareas,actualizarTarea, limpiarTarea}= tareasContext
    //state del formulario
    //effect que detecta si hay una tarea seleccionada para edicion
    useEffect(()=>{
        if(tareaseleccionada!==null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])

    const [tarea,guardarTarea]=useState({
        nombre:'',
        
    })

    //extraer el nombre de la tarea
    const {nombre}= tarea;

    //leer los valores del formulario

    const handleChange=e=>{
        guardarTarea({
            ...tarea,
            [e.target.name]:e.target.value})
           
            
    }

    

    //si no hay proyecto
    if(!proyecto) return null;
    //si hay proyecto array destructuring

    const [proyectoActual]= proyecto
    
    const onSubmit=e=>{
        e.preventDefault();
        //validar
        if(nombre.trim()===''){
            validarTarea();
            return
        }
        
        //revisar si hay edicion o es nuevo
        if(tareaseleccionada===null){
          
            //agregar la nueva tarea al state de tareas
            tarea.proyecto= proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //actualizar tarea existente
            
            actualizarTarea(tarea);
            // elimina la tarea seleccionada del state
            limpiarTarea()
        }
       
        //obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual._id)
        //reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    return ( 
    <div className="formulario">
        <form
            onSubmit={onSubmit}
        >
            <div className="contenedor-input">
                <input
                    type='text'
                    className='input-text'
                    placeholder='Nombre Tarea...'
                    name='nombre'
                    onChange={handleChange}
                    value={nombre}
                />
                
            </div>
            <div className="contenedor-input">
                <input
                    type='submit'
                    className='btn btn-primario btn-submit btn-block'
                    value={tareaseleccionada?'Editar Tarea':'Agregar Tarea'}
                    />
            </div>
        </form>
        {errortarea?<p className='mensaje error'>El nombre de la tarea es obligatorio</p> :null}
    </div> );
}
 
export default FormTarea;