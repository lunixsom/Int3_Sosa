import React, { useContext, useEffect, useState } from 'react'
import { Wallet } from '@mercadopago/sdk-react'

import Box from '../components/Box'
import Text from '../components/Text'

import { CartContext } from '../context/CartContext'
import { postPreferenceMP } from '../utils/api'

function Checkout() {

    const [preferenceId, setPreferenceId] = useState("")
    const {cart} = useContext(CartContext)

    useEffect(() => {
        const itemsList = cart.map( ({prod, quantity}) =>({
            id: prod.id,
            title: prod.name,
            picture_url: prod.img,
            quantity,
            unit_price: prod.amount
        }))
        postPreferenceMP({
            items: itemsList
        })
            .then( data => setPreferenceId(data.preferenceId))
    }, [cart])
    

    const totalAmount = cart.reduce( (acc, item) => acc + item.prod.amount * item.quantity, 0 )

    return (
        <Box className="m-5">
            <Text as='h3'>Productos seleccionados</Text>
            {
                cart.map(
                    ({prod, quantity}) =>
                        <Box className="d-flex align-center space-between">
                            <Text as='h4'>{prod.name}</Text>
                            <Text as='b'>{`$ ${prod.amount * quantity}`}</Text>
                        </Box>
                )
            }
            <Box className="d-flex align-center space-between">
                <Text as='h4'>Total:</Text>
                <Text as='b'>{`$ ${totalAmount}`}</Text>
            </Box>
            <Box className="d-flex justify-end">
                {
                    preferenceId &&
                        <Wallet 
                            initialization={{ preferenceId }}
                            customization={{ texts: {valueProp: "smart_option"} }}
                        />
                }
            </Box>
        </Box>
    )
}

export default Checkout