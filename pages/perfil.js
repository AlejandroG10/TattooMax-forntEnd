import Login from "../components/login";
import Nav from "../components/nav";
import Footer from "../components/footer";
import style from "../styles/Perfil.module.css"
import { useState, useEffect } from 'react';

export default function Perfil() {
  const [user, setUser] = useState()
  let userId = '';

  const recibeId = () => {
    userId = localStorage.getItem('token')
    fetchUser()
  }

  async function fetchUser(){
    const data = await fetch('https://tattoomax-backend.onrender.com/users').then(res => res.json()).then(data => {setUser(data.find(usuario => usuario._id == userId))})
    // console.log(user)
    }

  useEffect(() => {
    recibeId()
    // console.log(user)
  }, [])

  const editaDatos = () => {
    for(let i=0; i<document.querySelectorAll('input').length; i++){
      document.querySelectorAll('input')[i].removeAttribute('readOnly')
    }

    document.getElementById('editaDatos').style.display = 'none'
    document.getElementById('cambiaPass').style.display = 'none'
    document.getElementById('aceptaCambios').style.display = 'block'
    document.getElementById('cancelaCambios').style.display = 'block'
  }

  const cambiaPass = () => {
    var modal = document.getElementById("modalCambiaPass");

    modal.style.display = "block";
  }

  const actualizaDatos = () => {
    var datos = {username: document.getElementById("user").value, fullname: document.getElementById("nombre").value, email: document.getElementById("email").value, telefono: document.getElementById("tel")}

    fetch('https://tattoomax-backend.onrender.com/users/'+localStorage.getItem('token'), {method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(datos)})

    for(let i=0; i<document.querySelectorAll('input').length; i++){
      document.querySelectorAll('input')[i].removeAttribute('readOnly')
    }

    document.getElementById('aceptaCambios').style.display = 'none'
    document.getElementById('cancelaCambios').style.display = 'none'
    document.getElementById('editaDatos').style.display = 'block'
    document.getElementById('cambiaPass').style.display = 'block'

    var modalCambiaDatosOk = document.getElementById("modalCambiaDatosOk");

    modalCambiaDatosOk.style.display = "block";

    setTimeout(function(){
      var modalCambiaDatosOk = document.getElementById("modalCambiaDatosOk");

      modalCambiaDatosOk.style.display = "none";
    },2000);
  }

  const cancelarCambios = () => {
    for(let i=0; i<document.querySelectorAll('input').length; i++){
      document.querySelectorAll('input')[i].setAttribute('readOnly', true)
    }

    document.getElementById('aceptaCambios').style.display = 'none'
    document.getElementById('cancelaCambios').style.display = 'none'
    document.getElementById('editaDatos').style.display = 'block'
    document.getElementById('cambiaPass').style.display = 'block'
  }

  const aceptaCambiaPass = () => {
    if(document.getElementById('pass1').value === document.getElementById('pass2').value){
      var datos = {password: document.getElementById("pass1").value}
      fetch('https://tattoomax-backend.onrender.com/users/'+localStorage.getItem('token'), {method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(datos)})

      document.getElementById('pass1').value = ''
      document.getElementById('pass2').value = ''

      var modalCambiaPassOk = document.getElementById("modalCambiaPassOk");

      modalCambiaPassOk.style.display = "block";

      setTimeout(function(){
        var modalCambiaPassOk = document.getElementById("modalCambiaPassOk");

        modalCambiaPassOk.style.display = "none";
      },2000);
      closeModalCambiaPass()
    }
  }

  const closeModalCambiaPass = () => {
    var modalCambiaDatos = document.getElementById("modalCambiaPass");

    modalCambiaDatos.style.display = "none";
  }

  return (
    <div>
      <div>
        <Login/>
        <Nav />
      </div>
      
        {user && 
          <div className={style.containerDatos}>
            <h1 className={style.h1}>DATOS PERSONALES</h1>
            <p>Usuario: <input id="user" value={user.username} readOnly/></p>
            <p>Nombre: <input id="nombre" value={user.fullname} readOnly/></p>
            <p>Email: <input id="email" value={user.email} readOnly/></p>
            <p>Teléfono: <input id="tel" value={user.telefono} readOnly/></p>
            <button id='editaDatos' onClick={editaDatos}>EDITAR DATOS</button>
            <button id='cambiaPass' onClick={cambiaPass}>CAMBIAR CONTRASEÑA</button> 
            <button id='aceptaCambios' className={style.oculto} onClick={actualizaDatos}>ACEPTAR</button>
            <button id='cancelaCambios' className={style.oculto} onClick={cancelarCambios}>Cancelar</button>
          </div>
        }

        <div id="modalCambiaPass" className={style.modalContainer}>
            <div id="modalContentCambiaPass" className={style.modalContent}>
                <label>Escribe la nueva contraseña</label>
                <input id='pass1' className={style.input} type="password"/>
                <label>Repite la contraseña</label>
                <input id='pass2' className={style.input} type="password"/>
                <button onClick={aceptaCambiaPass}>ACEPTAR</button>
                <button onClick={closeModalCambiaPass}>CANCELAR</button>
            </div>
        </div>

        <div id="modalCambiaPassOk" className={style.modalContainer}>
            <div id="modalContentCambiaPassOk" className={style.modalContent}>
                <p>SE HA CAMBIADO LA CONTRASEÑA CORRECTAMENTE</p>
            </div>
        </div>

        <div id="modalCambiaDatosOk" className={style.modalContainer}>
            <div id="modalContentCambiaDatosOk" className={style.modalContent}>
                <p>SE HAN CAMBIADO TODOS LOS DATOS CORRECTAMENTE</p>
            </div>
        </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}