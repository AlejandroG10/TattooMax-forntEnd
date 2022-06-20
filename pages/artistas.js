import Login from "../components/login";
import Nav from "../components/nav";
import Footer from "../components/footer";
import style from '../styles/Artistas.module.css';
import { useState, useEffect } from 'react';

export default function Artists() {
  let [artistas, setArtistas] = useState([]);
    useEffect(() => {
        fetch('https://tattoomax-backend.onrender.com/artists').then(res => res.json()).then(data => {setArtistas(data)});
    }, [])
    
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    
    let artists = `<h1 class=${style.h1}>ARTISTAS</h1>`;
    {artistas.forEach(artista => {
        let artist = artista.name.replace(/\s+/g, '')
        artist = removeAccents(artist)
        // console.log(artist);
        artists += `
            <a href="../artists/${artist}" class=${style.container}>
                <div>
                    <Image src='${artista.imagen}' class=${style.img}></Image>
                    <h1 class=${style.h1}>${artista.name}</h1><br/>
                    <p class=${style.edad}>Edad: ${artista.edad}</p>
                    <p class=${style.email}>Email: ${artista.email}</p>
                    <p class=${style.descripcion}>${artista.descripcion}</p>
                </div>
            </a>`
    })}

    return (
      <div>
        <div>
          <Login/>
          <Nav />
        </div>
        <div  dangerouslySetInnerHTML={{ __html: artists }} className={style.block}>
          
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
  }