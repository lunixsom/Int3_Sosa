import Container from '../components/Container'
import Text from '../components/Text'
import imgJuego from '../assets/juego.jpg'


import "../styles/pages/_aboutUs.scss"

function AboutUs() {
    return (
        <Container as="main">
            

            <img src={imgJuego} alt="imagen juego" className='imgAboutUs'/>
           
                <p>
                    En SHINY creemos que jugar es para todas las edades.
                    No hay edad para reír, imaginar y sorprenderse. Por eso creamos un espacio donde adolescentes, grandes y
                    chicos puedan volver a conectar con lo que los hace felices. Cada producto está pensado para despertar
                    curiosidad, compartir momentos y, sobre todo, disfrutar. Porque el brillo en los ojos no se pierde: solo hay
                    que encontrar lo que lo enciende.
                </p>

        


        </Container>
    )
}

export default AboutUs