import { createContext, useState, useContext } from "react";
import { dessertList } from "../lib/constants";

const DessertContext = createContext();

export const DessertProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [desserts, setDesserts] = useState(
    dessertList.map((dessert) => {
      const cartItem = cartItems.find((item) => item.name === dessert.name);
      return {
        ...dessert,
        onCartAdded: !!cartItem,
        quantity: cartItem ? cartItem.quantity : 1,
      };
    })
  );

  const [quantity, setQuantity] = useState(1);
  const [onCheckOut, setOnCheckOut] = useState(false);

  const getOrderTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <DessertContext.Provider
      value={{
        cartItems,
        setCartItems,
        desserts,
        setDesserts,
        quantity,
        setQuantity,
        onCheckOut,
        setOnCheckOut,
        getOrderTotal,
      }}
    >
      {children}
    </DessertContext.Provider>
  );
};

export const useDessertContext = () => {
  return useContext(DessertContext);
};
