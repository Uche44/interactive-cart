import { useEffect } from "react";

const Cart = ({ cartItems, setCartItems }) => {
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

  return (
    <section
      id="cart"
      className="w-full h-fit flex flex-col items-start mt-10"
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
                <p className="text-gray-500  font-semibold text-[1.2rem]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button className="absolute right-[1rem] top-[2.1rem]">
                &#10006;
              </button>
            </div>
          ))
        )}

        <div className="w-full h-fit flex justify-between items-center mt-6 px-4">
          <p className="text-gray-400 text-[1.2rem]">Order Total</p>
          <h2 className="font-bold text-white text-[1.3rem]">$total</h2>
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
      <button className="w-full h-[3rem] bg-amber-700 rounded-[3rem] mb-4 mt-7 font-medium">
        Confirm Order
      </button>
    </section>
  );
};

export default Cart;
