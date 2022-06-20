import { useState, useEffect } from 'react';
import style from '../styles/Artista.module.css';
import Popup from 'reactjs-popup';

const Artista = (props) =>{
    const [artista, setArtista] = useState([]);
    const [horarios, setHorario] = useState([]);
    const [citas, setCitas] = useState([]);
    const [userLog, setUserLog] = useState();
    const [opiniones, setOpiniones] = useState([]);
    let userId = '';

    async function fetchHorario() {
        const data = await fetch('https://tattoomax-backend.onrender.com/horarios')
        return data;
    }

    async function fetchOpiniones(){
        const op = await fetch('https://tattoomax-backend.onrender.com/opiniones').then(res => res.json()).then(data => setOpiniones(data))
    }

    async function recibeUserLog(){
        // console.log('hola')
        userId = localStorage.getItem('token')
        const data = await fetch('https://tattoomax-backend.onrender.com/users')
        .then(res => res.json())
        .then(data => {setUserLog(data.find(user => user._id === userId))})
        // return data;
        // return userLog;
    }

    useEffect(() => {
        fetchHorario().then(res => res.json()).then(data => {setHorario(data.find(horario => horario.artist === props.id))});;
        fetch('https://tattoomax-backend.onrender.com/artists').then(res => res.json()).then(data => {setArtista(data.find(artist => artist.name === props.name))});
        fetchOpiniones()
        recibeUserLog()
    }, [])

    const anadirCom = () => {
        var datos = {artist: props.id, user: userLog.username, titulo: document.getElementById('tituloCom').value, opinion: document.getElementById('opinionCom').value}

        fetch('https://tattoomax-backend.onrender.com/opiniones/add', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datos)})

        closeModalCom()

        var modalComOk = document.getElementById("modalComOk");

        modalComOk.style.display = "block";

        setTimeout(function(){
            var modalComOk = document.getElementById("modalComOk");

            modalComOk.style.display = "none";
        },2000);

        fetchOpiniones()
    }


    const compruebaIsLog = () => {
        if(userLog === undefined){
            var modal = document.getElementById("myModal");

            modal.style.display = "block";

            setTimeout(function(){
                var modal = document.getElementById("myModal");

                modal.style.display = "none";
            },2000);
        }else if(userLog != undefined){
            var modalCom = document.getElementById("modalCom");

            modalCom.style.display = "block";
        }
    }

    const closeModalCom = () => {
        var modalCom = document.getElementById("modalCom");

        modalCom.style.display = "none";
    }

    let table = `<table class=${style.tabla}>`
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const horario = horarios.horas
        dias.forEach(dia => {
            table += `<tr><th class=${style.dias}>${dia}<th>`
            for(const hor in horario){
                let horas = horario[hor]
                    let h = horas[dia]
                    for(let horasDia in h){
                        table += `<td class=${style.horas}>${h[horasDia]}<td>`
                    }
            }
            table += `<tr>`
        })
    table += `</table>`

    let size = 0;
    let opinionesArt = [];
    for(const opinionArt in opiniones){
        console.log(opiniones[opinionArt].artist)
        if(opiniones[opinionArt].artist == props.id){
            opinionesArt.push(opiniones[opinionArt])
        }
    }
    let opinion = `<div>`
    for(const op in opinionesArt){
        console.log(opinionesArt[op])
        opinion += `<div class=${style.containerOp}>
                        <scroll-container class=${style.scrollContainer}>
                            <scroll-page id="user" class=${style.scrollPage}><p class=${style.userOp}><b>${opinionesArt[op].user}</b></p></scroll-page>
                            <scroll-page id="titulo"class=${style.scrollPage}><p class=${style.tituloOp}><b>${opinionesArt[op].titulo}</b></p></scroll-page>
                            <scroll-page id="opinion"class=${style.scrollPage}><p class=${style.opinion}>${opinionesArt[op].opinion}</scroll-page>
                        </scroll-container>
                    </div>`
        size++;
    }
    if(size==0){
        opinion += `<h3>No hay opiniones para este artista</h3>`
    }
    opinion += `</div>`

    return(
        <div className ={style.container}>
            <img src={artista.imagen} alt={artista.name} className={style.img} width="100px" height="100px"/>
            <h1>{artista.name}</h1>
            <p>Edad: {artista.edad}</p>
            <p>Email: {artista.email}</p>
            <p>{artista.descripcion}</p><br/>
            <h2 className={style.h2}>Horario</h2>
            <div dangerouslySetInnerHTML={{ __html: table }}>

            </div>
            <div className={style.containerCom}>
                <h2 className={style.h2}>Comentarios</h2>
                <div dangerouslySetInnerHTML={{ __html: opinion}} className={style.comentarios}>
                
                </div>
                <div>
                    <button onClick={() => {recibeUserLog(); compruebaIsLog() }} className={style.button}>Escribir un comentario</button>
                    <div id="modalCom" className={style.modalContainer}>
                        <div id="modalContentCom" className={style.modalContent}>
                            <span id="closeCom" onClick={closeModalCom} className={style.close}>×</span><br/>
                            <div>
                                <label className={style.labelCom}>Añade un título</label>
                                <input type="text" name="tituloCom" id="tituloCom" className={style.inpAnadeCom} required/>
                                <label className={style.labelCom}>Añade una opinión</label>
                                <textarea id="opinionCom" name="opinionCom" rows="3" className={style.textarea}/><br/>
                                <button onClick={anadirCom} className={style.button}>AÑADIR COMENTARIO</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* <Popup trigger={<button className={style.iniciaSesion}>AÑADIR COMENTARIO</button>} position="bottom center">
                        <div>
                            {userLog != null && anadirCom()}
                            {userLog == null && <p className={style.error}>Para poder añadir un comentario debes estar logueado</p>}
                        </div>
                    </Popup> */}
                    <div id="modalComOk" className={style.modalContainer}>
                        <div id="modalContentComOk" className={style.modalContent}>
                            <p>SE HA AÑADIDO EL COMENTARIO CORRECTAMENTE</p>
                        </div>
                    </div>

                    <div id="myModal" className={style.modalContainer}>
                        <div id="modalContent" className={style.modalContent}>
                            <p>PARA PODER AÑADIR UN COMENTARIO DEBES ESTAR LOGUEADO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artista;