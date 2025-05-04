import { dessertList } from "../lib/constants";
import { useState } from "react";

const FoodItem = ({ quantity, setQuantity, cartItems, setCartItems }) => {
  const [desserts, setDesserts] = useState(
    dessertList.map((dessert) => ({
      ...dessert,
      onCartAdded: false,
      quantity: 1,
    }))
  );

  const addToCart = (index) => {
    const dessertToAdd = desserts[index];

    setCartItems((prevCartItems) => {
      const isItemInCart = prevCartItems.some(
        (item) => item.name === dessertToAdd.name
      );

      if (isItemInCart) {
        console.log("Item already in cart");
        return prevCartItems;
      }

      const updatedCart = [...prevCartItems, { ...dessertToAdd, quantity: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      console.log("Item added to cart", updatedCart);
      return updatedCart;
    });

    setDesserts((prevDesserts) =>
      prevDesserts.map((dessert, i) =>
        i === index ? { ...dessert, onCartAdded: true } : dessert
      )
    );
  };

  const incrementQuantity = (index) => {
    const updatedDesserts = desserts.map((dessert, i) =>
      i === index ? { ...dessert, quantity: dessert.quantity + 1 } : dessert
    );
    setDesserts(updatedDesserts);
  };
  
  const decrementQuantity = (index) => {
    const updatedDesserts = desserts.map((dessert, i) =>
      i === index && dessert.quantity > 0
        ? { ...dessert, quantity: dessert.quantity - 1 }
        : dessert
    );
    setDesserts(updatedDesserts);
  };

  const updateCartQuantity = (index) => {
    const dessertToUpdate = desserts[index];

    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item.name === dessertToUpdate.name
          ? { ...item, quantity: dessertToUpdate.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <section className="w-full h-fit flex flex-col items-start">
      <h1 className="text-white font-bold text-[2rem]">Desserts</h1>
      <div className="w-full h-fit mt-4">
        {desserts.map((dessert, index) => (
          <div
            key={index}
            className="h-fit w-full relative"
          >
            <img
              className="w-full h-[15rem] border-amber-700 border-4 rounded-[1rem]"
              src={dessert.image.mobile}
              alt=""
            />

            <p className="text-gray-500 text-[1.2rem] mt-6">
              {dessert.category}
            </p>
            <h3 className="text-white font-semibold text-[1.5rem]">
              {dessert.name}
            </h3>
            <h3 className="text-amber-700 font-semibold text-[1.5rem] mb-5">
              ${dessert.price}
            </h3>

            {/* add to cart div */}
            <div className="w-[60%] border-gray-500 border-1 absolute left-[20%] top-[12.5rem] h-[4rem] rounded-[3rem] overflow-hidden">
              {!dessert.onCartAdded && (
                <button
                  onClick={() => addToCart(index)}
                  className="w-full h-full bg-black flex items-center justify-center gap-4"
                >
                  <img
                    src="/assets/images/icon-add-to-cart.svg"
                    alt=""
                    className=""
                  />
                  <p className="text-white font-medium">Add to Cart</p>
                </button>
              )}
              {dessert.onCartAdded && (
                <div className="w-full h-full py-4 px-5 flex justify-between items-center bg-amber-700">
                  <img
                    onClick={() => decrementQuantity(index)}
                    src="/assets/images/icon-decrement-quantity.svg"
                    alt=""
                    className="w-7 h-7 rounded-full border-white p-1 border-2"
                  />
                  <p className="text-white text-[1.5rem]">{dessert.quantity}</p>
                  <img
                    onClick={() => {
                      incrementQuantity(index);
                      updateCartQuantity(index);
                    }}
                    src="/assets/images/icon-increment-quantity.svg"
                    alt=""
                    className="w-7 h-7 rounded-full border-white p-1 border-2"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodItem;
