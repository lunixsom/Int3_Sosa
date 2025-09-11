import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'


import { CartContext } from '../context/CartContext'

import Box from "./Box"
import MyText from "./Text"
import Modal from './Modal'
import Counter from './Counter'
import { Navigate } from 'react-router'

function Cart() {

    const { cart, totalQuantity } = useContext(CartContext)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const totalAmount = cart.reduce((acc, item) => acc + item.prod.amount * item.quantity, 0)

    return (
        <>
            <Box className="cart__container" role="button" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faShoppingCart} size="xl" />
                <Box className="cart__badge">
                    <MyText as="span">{totalQuantity}</MyText>
                </Box>
            </Box>
            <Modal show={showModal} closeModal={() => setShowModal(false)}>
                <MyText as='h3'>Productos seleccionados</MyText>
                {
                    cart.map(
                        ({ prod, quantity }) =>
                            <Box key={prod.id} className="d-flex align-center space-between">
                                <MyText as='h4'>{prod.name}</MyText>
                                <Counter product={prod} />
                                <MyText as='b'>{`$ ${prod.amount * quantity}`}</MyText>
                            </Box>
                    )
                }
                <Box className="d-flex align-center space-between">
                    <MyText as='h4'>Total:</MyText>
                    <MyText as='b'>{`$ ${totalAmount}`}</MyText>
                </Box>

                <Box className="d-flex justify-end">
                    <button type="button" className="form__submit btn btn__primary" onClick={() => navigate("/checkout")}><FontAwesomeIcon icon={faShop} />Comprar</button>
                </Box>

            </Modal>
        </>
    )
}

export default Cart