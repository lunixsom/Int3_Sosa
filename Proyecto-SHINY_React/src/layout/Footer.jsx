import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Box from '../components/Box'
import Container from '../components/Container'
import Text from '../components/Text'
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <Box as='footer' className="footer__container m-4">
            <Container className="footer__wrapp">
                <Text as="h4">SHINY</Text>
                <Text as="span">Copyright 2025 ©</Text>
                <Box>
                    <FontAwesomeIcon className="footer__socialmedia-links" icon={faFacebook} />
                    <FontAwesomeIcon className="footer__socialmedia-links" icon={faInstagram} />
                    <FontAwesomeIcon className="footer__socialmedia-links" icon={faYoutube} />
                </Box>
            </Container>
        </Box>
    )
}

export default Footer