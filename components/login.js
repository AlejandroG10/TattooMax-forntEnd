import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import style from '../styles/Login.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useHistory } from "react-router-dom";


const Login = () =>{
    const [isRegistred, setIsRegistred] = useState(true);
    const [isLog, setIsLog] = useState(false);
    let userLog = '';
    const [isAdmin, setIsAdmin] = useState(false);

    const changeReg = () => {
        setIsRegistred(!isRegistred);
        return isRegistred;
    }

    async function recibeUserLog(idUser){
        const datos = await fetch('https://tattoomax-backend.onrender.com/users').then(res => res.json()).then(data => {userLog = data.find(user => user._id === idUser)})
        if(userLog.username == 'admin'){
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    }

    const recibeIsLog = () => {
        let idUser = localStorage.getItem('token')
        // console.log(idUser)

        if(idUser != null){
            recibeUserLog(idUser)
            setIsLog(true)
        }else{
            setIsLog(false)
        }
    }

    const removeToken = () => {
        localStorage.removeItem('token')
        recibeIsLog()
    }

    useEffect(() => {
        recibeIsLog();
    }, [])

    const iniciarSesion = () => {
        var data = {username: document.getElementById('userInicio').value, password: document.getElementById('passInicio').value}
        // console.log(data)
        fetch('https://tattoomax-backend.onrender.com/users/signin', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}).then(data => data.json()).then(data => {
            // console.log(data)
            localStorage.setItem("token", data._id);
        });
        recibeIsLog()
        setTimeout( function() { window.location.href = "/"; }, 2000 );
    }

    const registrarse = () => {
        var datosRegistro = {username: document.getElementById('userRegistro').value, fullname: document.getElementById('nameRegistro').value, password: document.getElementById('passRegistro').value, email: document.getElementById('emailRegistro').value, telefono: document.getElementById('telRegistro').value}
        var datosInicio = {username: document.getElementById('userRegistro').value, password: document.getElementById('passRegistro').value}
        
        fetch('https://tattoomax-backend.onrender.com/users/signup', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(datosRegistro)})
        fetch('https://tattoomax-backend.onrender.com/users/signin', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(datosInicio)}).then(datos => datos.json()).then(datos => {
            // console.log(datos)
            localStorage.setItem("token", datos._id);
        });
        recibeIsLog()
        setTimeout( function() { window.location.href = "/"; }, 2000 );
        // console.log(isLog)
    }
    
    return(
        <div>
            <div className={style.contenedor}>
                {!isLog && 
                    <Popup trigger={<button className={style.popupButton}>LOGIN</button>} position="bottom right">
                    <div>
                        <div >
                        <button className={style.cambiaForm} onClick={changeReg}><b>{isRegistred ? "Registrarse" : "Inciar sesion"}</b></button>
                        </div>
                        {!isRegistred && 
                        <> 
                            <label className={style.input}>Usuario: *</label>
                            <input type="text" id="userRegistro" className={style.input}/><br/>
                            <label className={style.input}>Nombre: *</label>
                            <input type="text" id="nameRegistro" className={style.input}/><br/>
                            <label className={style.input}>Contraseña: *</label>
                            <input type="password" id="passRegistro" className={style.input}/><br/>
                            <label className={style.input}>Email: *</label>
                            <input type="email" id="emailRegistro"className={style.input}/><br/>
                            <label className={style.input}>Teléfono</label>
                            <input type="tel" id="telRegistro" className={style.input}/><br/>
                            <button type="button" className={style.button} onClick={registrarse}>Registrarse</button>
                        </> }
                        {isRegistred &&
                        <> 
                            <label className={style.input}>Usuario:</label>
                            <input type="text" id="userInicio" className={style.input}/><br/>
                            <label className={style.input}>Contraseña:</label>
                            <input type="password" id="passInicio" className={style.input}/><br/>
                            <button type="button" className={style.button} onClick={iniciarSesion}>Iniciar sesión</button>
                        </>}
                    </div>
                </Popup>
                }
                {isLog && 
                    <div>
                        {!isAdmin && 
                            <Link href='/perfil' className={style.popupButton}>PERFIL</Link>
                        }
                        {isAdmin && 
                            <Link href='/perfilAdmin' className={style.popupButton}>PERFIL</Link>
                        }
                        
                        <Popup trigger={<button className={style.popupButton}>CERRAR SESIÓN</button>} position="bottom right">
                            <div className={style.contenedorPopup}>
                                <p>¿Estás seguro de que quieres cerrar la sesión?</p>
                                <Link href='/'><button onClick={removeToken} className={style.buttonRemoveToken}>SÍ</button></Link>
                            </div>
                        </Popup>
                    </div>
                }
            </div>
        </div>
        
        
    )
}


export default Login;