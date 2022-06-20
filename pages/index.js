import Image from 'next/image'
import style from '../styles/Home.module.css'
import Nav from '../components/nav'
import Login from '../components/login'
import Footer from '../components/footer'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import imgLocal1 from '../public/slider/local1.jpg';
import imgTatu1 from '../public/slider/tatu1.jpg';
import imgLocal2 from '../public/slider/local2.jpg';
import imgTatu2 from '../public/slider/tatu2.jpg';
import imgLocal3 from '../public/slider/local3.jpg';
import imgTatu3 from '../public/slider/tatu3.jpg';
import oferta from '../public/ofertas/oferta.png';
import oferta1 from '../public/ofertas/oferta1.png';
import oferta2 from '../public/ofertas/oferta2.png';
import oferta3 from '../public/ofertas/oferta3.png';
import Link from 'next/link';


export default function Home() {
  // require('../public/slider/local1.jpg')  ;
// require()  '../public/slider/tatu1.jpg';
// require()  '../public/slider/local2.jpg';
// require()  '../public/slider/tatu2.jpg';
// require()  '../public/slider/local3.jpg';
// require()  '../public/slider/tatu3.jpg';
require('../public/ofertas/oferta.png')  ;
// require()  '../public/ofertas/oferta1.png';
// require()  '../public/ofertas/oferta2.png';
// require()  '../public/ofertas/oferta3.png';

  const slideImages = [
    {url: imgLocal1, caption:'Slide 1'},
    {url: imgTatu1, caption:'Slide 2'},
    {url: imgLocal2, caption:'Slide 3'},
    {url: imgTatu2, caption:'Slide 4'},
    {url: imgLocal3, caption:'Slide 5'},
    {url: imgTatu3, caption:'Slide 6'},
  ]


  return (
    <div>
      <div>
        <Login/>
        <Nav/>
      </div>
      <div>
        <div className={style.cabeceraContainer}>
            <h1 className={style.cabecerah1}>BIENVENIDOS A LA WEB DEL ESTUDIO TATTOOMAX</h1>
            <h3 className={style.cabecerah3}>DONDE LA TINTA ES LO MAX...</h3>
        </div><br/><br/>

        
        
        <h1 className={style.h1}>GALERÍA DE IMÁGENES</h1>
        <div className={style.sliderContainer}>
          <Slide className={style.img}>
            {slideImages.map((slideImage, index)=> (
              <div key={index}>
                <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                  <Image src={slideImage.url} alt={slideImage.caption} width='700px' height="400px"/>
                </div>
              </div>
            ))} 
          </Slide>
        </div>
        
        <div className={style.ofertaContainer}>
          <div className={style.oferta}>
            <div className={style.cartaBox}>
              <div className={style.carta}>    
                <div className={style.cara}>
                  <Image src={oferta} width="400px" height="400px"/>
                </div>
                <div className={style.caraDetras}>
                <Image src={oferta1} width="400px" height="400px"/>
                </div>    
              </div>
            </div>
          </div>
          <div className={style.oferta}>
            <div className={style.cartaBox}>
              <div className={style.carta}>
                <div className={style.cara}>
                  <Image src={oferta} alt="oferta" width="400px" height="400px"/>
                </div>
                <div className={style.caraDetras}>
                  <Image src={oferta2} alt="oferta2" width="400px" height="400px"/>
                </div>
              </div>
            </div>
          </div>
          <div className={style.oferta}>
            <div className={style.cartaBox}>
              <div className={style.carta}>
                <div className={style.cara}>
                  <Image src={oferta} alt="oferta" width="400px" height="400px"/>
                </div>
                <div className={style.caraDetras}>
                  <Image src={oferta3} alt="oferta3" width="400px" height="400px"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.informacion}>
          <h3>Vistita los distintos sitios de esta página para ver toda la información acerca de nuestro estudio</h3>
            <div>Visita nuestra página de <p className={style.link}><Link href="/blog">información</Link></p> para saber acerca de recomendaciones e información sobre tatuajes</div>
            <div>Visita nuestra página <p className={style.link}><Link href="/local">local</Link></p> para ver horario y ubicacion de nuestro local</div>
            <div>Visita nuestra página <p className={style.link}><Link href="/artistas">artistas</Link></p> para ver toda la información de nuestros artistas, sus tatuajes realizados y sus horarios de trabajo</div>
        </div>
      </div><br/><br/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
