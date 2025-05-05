import { useState } from "react";
import FoodItem from "../components/FoodItem";
import Cart from "../components/Cart";
const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center py-10 md:grid md:grid-cols-[2fr_1fr]  px-8">
      <a
        href="#cart"
        className="fixed top-[1rem] right-[2rem] w-[2rem] h-[2rem] mt-4 ml-4"
      >
        <img
          src="/assets/images/icon-add-to-cart.svg"
          alt=""
          className=""
        />
      </a>
      <FoodItem
        cartItems={cartItems}
        setCartItems={setCartItems}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </section>
  );
};

export default HomePage;
