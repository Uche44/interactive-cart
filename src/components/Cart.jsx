import { useEffect } from "react";

const Cart = ({ setDesserts, cartItems, setCartItems }) => {
  const fetchCartItems = () => {
    const fetchedItems = localStorage.getItem("cartItems");
    const parsedItems = fetchedItems ? JSON.parse(fetchedItems) : [];

    if (JSON.stringify(parsedItems) !== JSON.stringify(cartItems)) {
      setCartItems(parsedItems);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const getOrderTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemoveItem = (index) => {
    const removedItem = cartItems[index];

    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setDesserts((prevDesserts) =>
      prevDesserts.map((dessert) =>
        dessert.name === removedItem.name
          ? { ...dessert, onCartAdded: false, quantity: 1 }
          : dessert
      )
    );
  };

  // const handleCheckOut = () => {
  //   const purchasedItems = localStorage.getItem(cartItems);
  //   console.log(JSON.parse(purchasedItems));
  // };

  return (
    <section
      id="cart"
      className="w-full h-fit flex flex-col items-start mt-10 md:fixed md:right-0 md:top-5 md:w-[33%] md:h-screen bg-black px-8 py-10 overflow-y-auto"
    >
      <h1 className="text-amber-700 font-bold text-[2rem]">
        Your Cart ({cartItems.length})
      </h1>

      <div className="w-full h-fit">
        {cartItems.length === 0 ? (
          <p className="text-white">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border-b-gray-900 border-1 p-4 rounded-lg mb-4 relative"
            >
              <h2 className="text-white text-[1.3rem] font-bold">
                {item.name}
              </h2>
              <div className="h-fit w-[12rem] border-2 flex justify-between">
                <p className="text-amber-700 font-medium text-[1.2rem]">
                  {item.quantity}x
                </p>
                <p className="text-gray-400 text-[1.2rem]">@${item.price}</p>
                <p className="text-gray-500 font-semibold text-[1.2rem]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="absolute right-[1rem] top-[2.1rem] text-gray-400 cursor-pointer brightness-125"
              >
                {/* &#10006; */}x
              </button>
            </div>
          ))
        )}

        <div className="w-full h-fit flex justify-between items-center mt-6 px-4">
          <p className="text-gray-400 text-[1.2rem]">Order Total</p>
          <h2 className="font-bold text-white text-[1.3rem]">
            ${getOrderTotal()}
          </h2>
        </div>
      </div>

      <div className="w-full h-[3rem] flex items-center justify-center mt-8 gap-4">
        <img
          src="/assets/images/icon-carbon-neutral.svg"
          alt=""
          className="h-[25px]"
        />
        <p className="text-white">
          This is a <b>carbon-neutral delivery</b>
        </p>
      </div>
      <button
        // onClick={handleCheckOut}
        className="w-full h-[3rem] bg-amber-700 rounded-[3rem] mb-4 mt-7 font-medium md:h-[4rem] cursor-pointer"
      >
        Confirm Order
      </button>
    </section>
  );
};

export default Cart;
