import Artista from "../../components/artista";
import Login from "../../components/login";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function VictorSmith() {    
    return(
        <div>
            <div>
            <div>
                <Login/>
                <Nav/>
            </div>
            <div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
            <Artista name={"Víctor Smith"} id={"6282a1536896306a2c172909"}/>
        </div>
    )
}