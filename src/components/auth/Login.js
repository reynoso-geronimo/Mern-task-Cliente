import React, {useState,useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {
      //extraer los valores del cotnext alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje, autenticado, iniciarSesion}= authContext 

  
  useEffect(()=>{
     if(autenticado){
      props.history.push('/proyectos');
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mensaje, autenticado, props.history])

    //state para iniciar sesion
    const [usuario, guardarUsuario]= useState({
        email:'',
        password:''
    })

    const {email, password}= usuario
    const onChange= e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar sesion

    const onSubmit =e=>{
        e.preventDefault()
        //validacion
        if(email.trim()===''||password.trim()===''){
            mostrarAlerta('Todos los campos son olbigatorios','alerta-error')
        }
        iniciarSesion({email, password});
        //pasarlo al action 

    }

    return ( 
        <div className="form-usuario">
            {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Iniciar Sesión</h1>

            <form
                    onSubmit={onSubmit}
                    >
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu Email"
                       
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu Password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className='campo-form'>
                    <input 
                    type='submit'
                    className='btn btn-primario btn-block'
                    value= 'Iniciar Sesion'
                    />
                </div>
               
            </form>
            <Link to ={'/nueva-cuenta'} className='enlace-cuenta'>Obtener cuenta</Link>
            </div>
        </div>
        );
}
 
export default Login;