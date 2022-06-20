import style from '../styles/nav.module.css';
import logo from '../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';

const Nav = () =>{
    return(
        <div className={style.container}>
            <Link href="/"><Image className={style.image} src={logo} height="125px" width="200px"></Image></Link>
            <div className={style.nav}>
                <div className={style.nav}>
                    <Link href="/">INICIO</Link>
                </div>
                <div className={style.nav}>
                    <Link href="/local">LOCAL</Link>
                </div>
                <div className={style.nav}>
                    <Link href="/artistas">ARTISTAS</Link>
                </div>
                <div className={style.nav}>
                    <Link href="/blog">INFORMACIÓN</Link>
                </div>
            </div>
        </div>
    )
}


export default Nav;