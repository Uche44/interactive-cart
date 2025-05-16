import FoodItem from "../components/FoodItem";
import Cart from "../components/Cart";
import { useDessertContext } from "../context/DessertContext";
import CheckOut from "../components/CheckOut";
const HomePage = () => {
  const { onCheckOut } = useDessertContext();

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
      <FoodItem />
      <Cart />
      {onCheckOut && <CheckOut />}
    </section>
  );
};

export default HomePage;
