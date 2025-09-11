import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { CartContext } from "../context/CartContext";

import Box from './Box'
import MyText from './Text'  // <-- Cambiado a MyText

function Counter({
    product
}) {

    const { cart, setQuantity } = useContext(CartContext)
    const prodInCart = cart.find( ({prod}) => prod._id === product._id )
    const [counter, setCounter] = useState(
        prodInCart?.quantity ||
        0
    );

    useEffect(() => {
        if (prodInCart?.quantity !== counter) {
            setCounter(prodInCart?.quantity || 0)
        }
    }, [cart])

    const increment = () => {
        setCounter(counter + 1)
        setQuantity(product, counter + 1)
    }

    const decrement = () => {
        setCounter(counter - 1)
        setQuantity(product, counter - 1)
    }

    return (
        <Box className="d-flex align-center">
            <button type="button" className="btn btn__primary" onClick={decrement} disabled={counter === 0}><FontAwesomeIcon icon={faMinus} /></button>
            <MyText as="strong" className="ml-5 mr-5">{counter}</MyText>
            <button type="button" className="btn btn__primary" onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
        </Box>
    )
}

export default Counter
