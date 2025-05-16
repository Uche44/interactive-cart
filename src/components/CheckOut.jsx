import { useEffect } from "react";
import { useDessertContext } from "../context/DessertContext";

const CheckOut = () => {
  const { cartItems, getOrderTotal } = useDessertContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const resetCart = () => {
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-10 backdrop-blur-sm overflow-y-auto pointer-events-auto">
      <div className="max-h-[85vh] w-[38%] bg-black border border-gray-700 mx-auto my-10 p-8 rounded-[1.5rem] shadow-[0_0_30px_10px_rgba(255,255,255,0.3)] ">
        <div className="sticky top-0 bg-black pt-2 pb-4 z-20">
          <img
            src="/assets/images/confirmed.svg"
            alt=""
            className="h-11 w-11 mb-5"
          />
          <h1 className="text-white font-bold text-xl">Order Confirmed</h1>
          <p className="text-gray-400 mt-3 mb-4">
            We hope you enjoy your food!
          </p>
        </div>

        <div className="space-y-4 max-h-[calc(60vh-180px)] overflow-y-auto pb-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between bg-black p-4 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.image.mobile}
                  alt={item.name}
                  className="w-[55px] h-[55px] rounded-md object-cover mr-4"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {item.name}
                  </h2>
                  <span className="flex mt-2">
                    <p className="text-amber-600 mr-4 font-semibold">
                      x{item.quantity}
                    </p>
                    <p className="text-gray-400">@${item.price.toFixed(2)}</p>
                  </span>
                </div>
              </div>
              <p className="font-semibold text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-black pt-4 border-t border-gray-700 rounded-[1.5rem]">
          <div className="w-full flex justify-between items-center px-4 mb-6">
            <p className="text-white font-medium">Order Total</p>
            <h2 className="font-bold text-white text-[1.3rem]">
              ${getOrderTotal()}
            </h2>
          </div>
          <button
            onClick={resetCart}
            className="bg-amber-600 hover:bg-amber-700 transition-colors w-full h-12 rounded-full text-black font-bold cursor-pointer"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
