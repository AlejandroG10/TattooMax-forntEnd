import { useState, useEffect } from 'react';
import style from '../styles/Horario.module.css';

const HorarioLocal = () =>{
    const [horario, setHorario] = useState([]);

    useEffect(() => {
        fetch('https://tattoomax-backend.onrender.com/horarioLocal').then(res => res.json()).then(data => {setHorario(data)});
    }, [])

    let thead = `<tr>`;
    horario.forEach(hor => {
        hor.dias.forEach(dia => {
            thead += `<th style="border:1px solid black"><b>${dia}</b></th>`;
        })
        thead += `<th style="border:1px solid black">Domingo</th>`;
        thead += `</tr>`
    })

    let tbody = '';
    horario.forEach(hor => {
        hor.horas.forEach(hora => {
            tbody += `<tr>`
            hor.dias.forEach(dia => {
                tbody += `<td style="border:1px solid black">${hora}</td>`;
            })
            tbody += `<td style="border:1px solid black">CERRADO</td>`
            tbody += `</tr>`
        })
    })
    
    


    // console.log(horario[0].dias[0])
    return(
        <div>
            <h1 className={style.h1}>HORARIO</h1>
            <table className={style.table}>
                <thead dangerouslySetInnerHTML={{ __html: thead }} className={style.thead}>

                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: tbody }}>

                </tbody>
            </table>
        </div>
    );
}


export default HorarioLocal;