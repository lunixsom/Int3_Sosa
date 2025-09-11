import AppRoutes from "./routes/AppRoutes"
import CartProvider from "./context/CartProvider" 
import React from "react"


function App() {
    return (
        <CartProvider>
            <AppRoutes />
        </CartProvider>
    )
}

export default App