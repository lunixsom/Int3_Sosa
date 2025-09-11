import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Box from "../components/Box";
import MyText from "../components/Text";
import Counter from "../components/Counter";
import "../styles/components/_checkout.scss";
import { Wallet } from "@mercadopago/sdk-react";

function Checkout() {
  const { cart } = useContext(CartContext);
  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(false);

  const postPreferenceMp = async (body) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return res.json();
    } catch (err) {
      console.error("Error al crear preferencia:", err);
      return { ok: false };
    }
  };

  useEffect(() => {
    const createPreference = async () => {
      if (!cart || cart.length === 0) return;

      setLoading(true);

      const itemsList = cart.map(({ prod, quantity }) => ({
        id: prod._id,
        title: prod.name,
        picture_url: prod.img,
        quantity,
        unit_price: prod.amount,
      }));

      const data = await postPreferenceMp({ items: itemsList });
      if (data.ok) setPreferenceId(data.preferenceId);

      setLoading(false);
    };

    createPreference();
  }, [cart]);

  const totalAmount = cart.reduce((acc, item) => acc + item.prod.amount * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return <MyText as="h3">No hay productos en el carrito.</MyText>;
  }

  return (
    <Box className="checkout__container">
      <MyText as="h3">Productos seleccionados</MyText>

      {cart.map(({ prod, quantity }) => (
        <Box key={prod._id} className="d-flex align-center space-between">
          <MyText as="h4">{prod.name}</MyText>
          <Counter product={prod} />
          <MyText as="b">{`$ ${prod.amount * quantity}`}</MyText>
        </Box>
      ))}

      <Box className="d-flex align-center space-between">
        <MyText as="h4">Total:</MyText>
        <MyText as="b">{`$ ${totalAmount}`}</MyText>
      </Box>

      <Box className="d-flex justify-end">
        {loading && <MyText>Preparando tu pago…</MyText>}
        {!loading && preferenceId && (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
      </Box>
    </Box>
  );
}

export default Checkout;
