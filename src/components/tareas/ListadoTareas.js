import React,{Fragment,useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup}from 'react-transition-group';

const ListadoTareas = () => {
    const proyectosContext= useContext(proyectoContext)
    const {proyecto,eliminarProyecto} =proyectosContext
    const tareasContext = useContext(tareaContext)
    const {tareasproyecto} = tareasContext
    //array destructuring para extraer el proyecto

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>
    
    const [proyectoActual] = proyecto
    
   
    const onclickEliminar=()=>{
        eliminarProyecto(proyectoActual._id)
    }

    return ( <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
        <ul className='listado-tareas'>
            {tareasproyecto.length===0
                ?(<li className='tarea'><p>No hay tareas</p></li>)
                : <TransitionGroup>
                   { tareasproyecto.map(tarea=>(
                    <CSSTransition
                    key={tarea._id}
                    timeout={200}
                    classNames='proyecto'
                    >
                        
                        <Tarea
                        
                        tarea={tarea}
                    />
                    </CSSTransition>
                ))}
                </TransitionGroup>

            }
             <button
            type="button"
            className="btn btn-eliminar"
            onClick={()=>{onclickEliminar()}}
        >Eliminar Proyecto &times;</button>
        </ul>

       
        </Fragment>
     );
}
 
export default ListadoTareas;