import Box from './Box'
import Counter from './Counter'
import MyText from './Text'  // <-- Cambiado a MyText

function Card({
    img,
    name,
    shortDescription,
    amount,
    ...props
}) {
    return (
        <Box className="card">
            <img src={img} alt={name} />
            <Box className="card__content m-4">
                <Box>
                    <MyText as="h3">{name}</MyText>
                    <MyText>{shortDescription}</MyText>
                </Box>
                <Box className="card__price">
                    <Box className="d-flex justify-center w-100">
                        <Counter 
                            product={{
                                img,
                                name,
                                shortDescription,
                                amount,
                                ...props
                            }}
                        />
                    </Box>
                    <hr className="w-100"/>
                    <MyText as='b'>{`$ ${amount}`}</MyText>
                </Box>
            </Box>
        </Box>
    )
}

export default Card
