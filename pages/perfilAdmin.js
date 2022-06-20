import Login from "../components/login";
import Nav from "../components/nav";
import Footer from "../components/footer";
import style from "../styles/PerfilAdmin.module.css"
import { useState, useEffect } from 'react';
import { FormText } from "reactstrap";

export default function PerfilAdmin() {
    const [consultas, setConsultas] = useState([])
    const [citas, setCitas] = useState([])
    // const [users, setUsers] = useState([])
    // const [artists, setArtists] = useState([])
    // const [elegido, setElegido] = useState()
    let userId = '';

    useEffect(() => {
        fetch('https://tattoomax-backend.onrender.com/consultas').then(res => res.json()).then(data => {setConsultas(data)})
        fetch('https://tattoomax-backend.onrender.com/citas').then(res => res.json()).then(data => {setCitas(data)})
        // fetch('https://tattoomax-backend.onrender.com/users').then(res => res.json()).then(data => {setUsers(data)})
        // fetch('https://tattoomax-backend.onrender.com/artists').then(res => res.json()).then(data => {setArtists(data)})
        // console.log(artists)
    }, [])

    const escribeCita = () => {
        var modal = document.getElementById("modalCita");

        modal.style.display = "block";
    }

    // const editarUser = (user) => {
    //     for(let i = 0; i < document.getElementsByClassName(user).length; i++){
    //         document.getElementsByClassName(user)[i].removeAttribute("readonly")
    //     }

    //     document.getElementById('botonUser').style.display = 'none'
    //     for(let i = 0; i < document.getElementsByClassName('buttonUserElim').length; i++){
    //         // document.getElementsByClassName('buttonUserElim')[i].style.display = 'block'
    //         // document.getElementsByClassName('buttonUserElim')[i].setAttribute('click', eliminarUser)
    //         // document.getElementsByClassName('buttonUserAcep')[i].style.display = 'block'
    //         // document.getElementsByClassName('buttonUserAcep')[i].setAttribute('click', actualizarUser)
    //     }
    // }

    // const eliminarUser = (user) => {
    //     fetch('https://tattoomax-backend.onrender.com/users/'+user, {method: 'DELETE', headers: {"Content-Type": "application/json"}})
    // }

    // const editarArtist = () => {
    //     for(let i = 0; i < document.getElementsByClassName('artist').length; i++){
    //         document.getElementsByClassName('artist')[i].removeAttribute("readonly")
    //     }

    //     document.getElementById('botonArtist').style.display = 'none'
    //     for(let i = 0; i < document.getElementsByClassName('buttonArtist').length; i++){
    //         document.getElementsByClassName('buttonArtistElim')[i].style.display = 'block'
    //         document.getElementsByClassName('buttonArtistElim')[i].setAttribute('click', eliminarArtist)
    //         document.getElementsByClassName('buttonArtistAcep')[i].style.display = 'block'
    //         document.getElementsByClassName('buttonArtistAcep')[i].setAttribute('click', actualizarArtist)
    //     }
    // }

    // const actualizarArtist = () => {

    // }

    // const eliminarArtist = () => {

    // }

    

    const anadeCita = () => {
        var datos = {name: document.getElementById('nombre').value, artist: document.getElementById('artista').value, cita: document.getElementById('cita').value, descripcion: document.getElementById('descripcion').value}

        fetch('https://tattoomax-backend.onrender.com/citas/add', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(datos)})

        document.getElementById('nombre').value = '';
        document.getElementById('artista').value = '';
        document.getElementById('cita').value = '';
        document.getElementById('descripcion').value = '';

        closeModalCita();
        var modal = document.getElementById("myModal");

        modal.style.display = "block";

        setTimeout(function(){
            var modal = document.getElementById("myModal");

            modal.style.display = "none";
        },2000);
    }

    const closeModalCita = () => {
        var modalCom = document.getElementById("modalCita");

        modalCom.style.display = "none";
    }

    const eliminaCita = () => {
        console.log("a")
    }

    // const closeModalUser = () => {
    //     var modalCom = document.getElementById("modalUser");

    //     modalCom.style.display = "none";
    // }

    // const compruebaVaca = (vacaciones) => {
    //     if(!vacaciones){
    //         document.getElementById('botonVaca').innerText = '✓'
    //     }else{
    //         document.getElementById('botonVaca').innerText = '✕'
    //     }
    // }

    
    // let usuarios = `<table class=${style.table}>
    //                     <tr>
    //                         <th class=${style.cabeceraTable}>Usuario</th>
    //                         <th class=${style.cabeceraTable}>Nombre</th>
    //                         <th class=${style.cabeceraTable}>Email</th>
    //                         <th class=${style.cabeceraTable}>Telefono</th>
    //                         <th class=${style.cabeceraTable}></th>
    //                     </tr>`
    // for(const user in users){
    //     usuarios += `<tr}>
    //                     <td class=${style.contTable}><input class=${users[user]._id} type='text' value='${users[user].username}' readonly/></td>
    //                     <td class=${style.contTable}><input class=${users[user]._id} type='text' value='${users[user].fullname}' readonly/></td>
    //                     <td class=${style.contTable}><input class=${users[user]._id} type='text' value='${users[user].email}' readonly/></td>
    //                     <td class=${style.contTable}><input class=${users[user]._id} type='text' value='${users[user].telefono}' readonly/></td>
    //                     <td class=${style.contTable}><button onClick=${editarUser(users[user]._id)}>ACEPTAR</button><button onClick=${eliminarUser(users[user]._id)}>ELIMINAR</button></td>
    //                 </tr>`
    // }
    // usuarios += `</table>`

    // let artistas = `<table class=${style.table}>
    //                     <tr>
    //                         <th class=${style.cabeceraTable}>Nombre</th>
    //                         <th class=${style.cabeceraTable}>Email</th>
    //                         <th class=${style.cabeceraTable}>Vacaciones</th>
    //                         <th class=${style.cabeceraTable}>Edad</th>
    //                         <th class=${style.cabeceraTable}></th>
    //                     </tr>`
    // for(const artist in artists){
    //     artistas += `<tr id=${artist}>
    //                     <td class=${style.contTable}><input class='artist' type='text' value='${artists[artist].name}' readonly/></td>
    //                     <td class=${style.contTable}><input class='artist' type='text' value='${artists[artist].email}' readonly/></td>
    //                     <td class=${style.contTable}><input class='artist' type='text' value='' readonly/></td>
    //                     <td class=${style.contTable}><input class='artist' type='text' value='${artists[artist].edad}' readonly/></td>
    //                     <td class=${style.contTable}><button class='buttonArtistAcep' style='display: none'>ACEPTAR</button><button class="buttonArtistElim" style='display: none'>ELIMINAR</button></td>
    //                 </tr>`
    // }
    // artistas += `</table>`


    let consultasUsuarios = '';
    for(const consulta in consultas) {
        // console.log(consulta)
        consultasUsuarios += `<div class=${style.containerConsultas}>
                                <p class=${style.nameConsulta}><b>${consultas[consulta].name}</b></p>
                                <spam class=${style.spam}>Email: ${consultas[consulta].email}</p>
                                <spam class=${style.spam}>Teléfono: ${consultas[consulta].telefono}</p>
                                <p class=${style.consulta}>${consultas[consulta].consulta}</p>
                            </div>`
    }


    let citasUsuarios = '';
    for(const cita in citas){
        citasUsuarios += `<div class=${style.containerCitas}>
                            <p class=${style.nameCitas}><b>${citas[cita].name}</b></p>
                            <p class=${style.artistCitas}><b>Artista: </b>${citas[cita].artist}</p>
                            <p class=${style.fechaCitas}><b></b>${citas[cita].cita}</p>
                            <p class=${style.descripcionCitas}>${citas[cita].descripcion}</p>
                            <button click=${eliminaCita()}>Eliminar</button>
                        </div>`
    }

  return (
    <div>
      <div>
        <Login/>
        <Nav />
      </div>
      <div>
        <div>
            {/* <h1 className={style.h1}>USUARIOS</h1>
            <div dangerouslySetInnerHTML={{ __html: usuarios }}>

            </div>
            <button id='botonUser' onClick={editarUser} className={style.botonEditar}>EDITAR USUARIOS</button>
            <h1 className={style.h1}>ARTISTAS</h1>
            <div dangerouslySetInnerHTML={{ __html: artistas }}>

            </div>
            <button id='botonArtist' onClick={editarArtist} className={style.botonEditar}>EDITAR ARTISTAS</button> */}
            <h1 className={style.h1}>CONSULTAS</h1>
            <div dangerouslySetInnerHTML={{ __html: consultasUsuarios }}>

            </div>
            <button className={style.button} onClick={escribeCita}>AÑADIR CITA</button><br/>
            <h1 className={style.h1}>CITAS</h1>
            <div dangerouslySetInnerHTML={{ __html: citasUsuarios }}>

            </div>
            <div id="modalCita" className={style.modalContainer}>
                <div id="modalContentCita" className={style.modalContent}>
                    <span id="closeCita" onClick={closeModalCita} className={style.close}>×</span><br/>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" id="nombre"/>
                        <label>Artista</label>
                        <input type="text" id="artista"/>
                        <label>Cita</label>
                        <input type="text" id="cita" placeholder="INDICA LA FECHA Y HORA"/>
                        <label>Descripción</label>
                        <textarea type="text" id="descripcion"/>
                        <button onClick={anadeCita}>ACEPTAR</button>
                    </div>
                </div>
            </div>
            <div id="myModal" className={style.modalContainer}>
                <div id="modalContent" className={style.modalContent}>
                    <p>CITA AÑADIDA CORRECTAMENTE</p>
                </div>
            </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}