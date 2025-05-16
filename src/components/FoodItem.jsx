import { useEffect } from "react";
import { useDessertContext } from "../context/DessertContext";

const FoodItem = () => {
  // const [desserts, setDesserts] = useState(
  //   dessertList.map((dessert) => {
  //     const cartItem = cartItems.find((item) => item.name === dessert.name);
  //     return {
  //       ...dessert,
  //       onCartAdded: !!cartItem,
  //       quantity: cartItem ? cartItem.quantity : 1,
  //     };
  //   })
  // );

  const {
    cartItems,
    setCartItems,
    desserts,
    setDesserts,
    // quantity,
    // setQuantity,
  } = useDessertContext();

  useEffect(() => {
    setDesserts((prevDesserts) =>
      prevDesserts.map((dessert) => {
        const cartItem = cartItems.find((item) => item.name === dessert.name);
        return cartItem
          ? { ...dessert, quantity: cartItem.quantity, onCartAdded: true }
          : dessert;
      })
    );
  }, [cartItems]);

  const addToCart = (index) => {
    const dessertToAdd = desserts[index];

    setCartItems((prevCartItems) => {
      const isItemInCart = prevCartItems.some(
        (item) => item.name === dessertToAdd.name
      );
      if (isItemInCart) return prevCartItems;

      const updatedCart = [
        ...prevCartItems,
        {
          ...dessertToAdd,
          quantity: dessertToAdd.quantity,
        },
      ];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setDesserts((prevDesserts) =>
      prevDesserts.map((dessert, i) =>
        i === index ? { ...dessert, onCartAdded: true } : dessert
      )
    );
  };

  // const adjustQuantity = (index, change) => {

  //   setDesserts((prevDesserts) => {
  //     const newQuantity = prevDesserts[index].quantity + change;
  //     return prevDesserts.map((dessert, i) =>
  //       i === index
  //         ? {
  //             ...dessert,
  //             quantity: Math.max(1, newQuantity),
  //           }
  //         : dessert
  //     );
  //   });

  // };

  const adjustQuantity = (index, change) => {
    // Get current cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    setDesserts((prevDesserts) => {
      const updatedDesserts = [...prevDesserts];
      const dessertToUpdate = updatedDesserts[index];
      const newQuantity = Math.max(1, dessertToUpdate.quantity + change);

      updatedDesserts[index] = {
        ...dessertToUpdate,
        quantity: newQuantity,
      };

      const updatedCart = storedCart.map((item) =>
        item.name === dessertToUpdate.name
          ? { ...item, quantity: newQuantity }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      setCartItems(updatedCart);

      return updatedDesserts;
    });
  };

  const syncQuantityToCart = (index) => {
    const dessert = desserts[index];
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item.name === dessert.name
          ? { ...item, quantity: dessert.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <section className="w-full h-fit flex flex-col items-start mr-4">
      <h1 className="text-white font-bold text-[2rem]">Desserts</h1>
      <div className="w-full h-fit mt-4 md:grid md:grid-cols-2 gap-4">
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

            <div className="w-[60%] border-gray-500 border-1 absolute left-[20%] top-[12.5rem] h-[4rem] rounded-[3rem] overflow-hidden">
              {!dessert.onCartAdded ? (
                <button
                  onClick={() => addToCart(index)}
                  className="w-full h-full bg-black flex items-center cursor-pointer justify-center gap-4"
                >
                  <img
                    src="/assets/images/icon-add-to-cart.svg"
                    alt=""
                  />
                  <p className="text-white font-medium">Add to Cart</p>
                </button>
              ) : (
                <div className="w-full h-full py-4 px-5 flex justify-between items-center bg-amber-700">
                  <button
                    onClick={() => {
                      adjustQuantity(index, -1);
                      syncQuantityToCart(index);
                    }}
                    disabled={dessert.quantity <= 1}
                    className="cursor-pointer"
                    title="Decrease quantity"
                  >
                    <img
                      src="/assets/images/icon-decrement-quantity.svg"
                      alt="Decrease"
                      className={`w-7 h-7 rounded-full border-white p-1 border-2 ${
                        dessert.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </button>
                  <p className="text-white text-[1.5rem]">{dessert.quantity}</p>
                  <button
                    onClick={() => {
                      adjustQuantity(index, 1);
                      syncQuantityToCart(index);
                    }}
                    className="cursor-pointer"
                  >
                    <img
                      src="/assets/images/icon-increment-quantity.svg"
                      alt="Increase"
                      className="w-7 h-7 rounded-full border-white p-1 border-2"
                    />
                  </button>
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
