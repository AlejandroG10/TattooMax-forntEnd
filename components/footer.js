import style from '../styles/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import imgDireccion from '../public/iconos/direccion.png'
import imgTel from '../public/iconos/tel.png'
import imgMovil from '../public/iconos/movil.png'
import imgMail from '../public/iconos/mail.jpg'
import UNTAP from '../public/iconos/UNTAP.png'

const Footer = () =>{
    return(
        <div className={style.container}>
            <div className={style.div}>
            <h1 className={style.h1}>TATTOOMAX</h1>
            <p>TattooMax es un estudio artístico de tattoos y piercing en Jerez de la Frontera, Cádiz. Miembros de la Unión Nacional de Tatutadores y Anilladores Profesionales (UNTAP) desde hace 20 años.</p>
            </div>

            <div className={style.div}>
                <h1 className={style.h1}>DATOS DE CONTACTO</h1>
                <Image src={imgDireccion} className={style.img} alt="direccion" width="20px" height="20px"/><p className={style.p}>Cruce con, Avenida Amsterdam, C. Estocolmo, 11405 Jerez de la Frontera, Cádiz</p><br/><br/>
                <Image src={imgTel} className={style.img} alt="telefono" width="20px" height="20px"/><p className={style.p}>952 945 894</p><br/><br/>
                <Image src={imgMovil} className={style.img} alt="movil" width="20px" height="20px"/><p className={style.p}>646 589 745</p><br/><br/>
                <Image src={imgMail} className={style.img} alt="mail" width="20px" height="20px"/><p className={style.p}>alejandrogilromero@fp.iesromerovargas.com</p><br/><br/>
            </div>

            <div className={style.div}>
                <h1 className={style.h1}>APARTADOS WEB</h1>
                <div>
                    <Link href='/'>Inicio</Link>
                </div><br/>
                <div>
                    <Link href='/horarios'>Horario</Link>
                </div><br/>
                <div>
                    <Link href='/artistas'>Artistas</Link>
                </div><br/>
                <div>
                    <Link href='/blog'>Información</Link>
                </div><br/>
            </div>

            <div className={style.div}>
                <Link href='https://untap.org'><Image src={UNTAP} className={style.UNTAP} alt="UNTAP" width="220%" height="100%"/></Link>
            </div>
        </div>
    )
}


export default Footer;