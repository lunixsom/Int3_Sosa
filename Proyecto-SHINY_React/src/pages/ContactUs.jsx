import Box from "../components/Box"
import Container from "../components/Container"
import Form from "../components/Form"
import Text from "../components/Text"

import { useForm } from "../hooks/useForm"
import { postContact } from "../utils/api"

const inputsValidations = {
    name: {
        validation: value => value.length > 2,
        errorText: "El nombre es incorrecto"
    },
    email: {
        validation: value => {
            const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            return regexp.test(value);
        },
        errorText: "El email no tiene el formato correcto"
    },
    subject: {
        validation: value => value.length > 0,
        errorText: "El asunto es obligatorio"
    },
    message: {
        validation: value => value.length > 0,
        errorText: "Ingrese un texto"
    }
}

function ContactUs() {

    const {values, onChange, errors} = useForm({
        name: "",
        email: "",
        subject: "",
        message: ""
    }, inputsValidations)

    const handleSubmit = e => {
        e.preventDefault()
        if (Object.values(errors).every( val => !val )) {
            postContact(values)
                .then(() => alert("Mensaje enviado correctamente"))
                .catch( err => console.error(err) )
        } else {
            console.log("Formulario inválido")
        }
    }

    return (
        <Container as="main">
            <Text as="h2" className="mt-12">Contactanos</Text>
            <Box className="mt-12 d-flex">
                <Box className="col-xs-12 col-md-6 col-lg-5 col-xl-4 w-40">
                    <Form 
                        values={values}
                        errors={errors}
                        onChange={onChange}
                        onSubmit={handleSubmit}
                        inputsArray={[
                            {
                                name: "name",
                                type: "text",
                                label: "Nombre"
                            },
                            {
                                name: "email",
                                type: "email",
                                label: "e-Mail"
                            },
                            {
                                name: "subject",
                                type: "text",
                                label: "Asunto"
                            },
                            {
                                name: "message",
                                type: "text",
                                label: "Mensaje"
                            },
                        ]}
                    />
                </Box>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3207635563494!2d-58.39688818886746!3d-34.59604957284419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabdfc19634f%3A0x64ee35e91065805!2sEditorial%20El%20Ateneo%20Grupo%20Ilhsa!5e0!3m2!1ses-419!2sar!4v1756086300257!5m2!1ses-419!2sar" className="w-60"></iframe>
            </Box>
        </Container>
    )
}

export default ContactUs