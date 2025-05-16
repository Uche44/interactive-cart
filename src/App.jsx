import React from "react";
import HomePage from "./pages/HomePage";
import { DessertProvider } from "./context/DessertContext";
const App = () => {
  return (
    <div>
      <DessertProvider>
        <HomePage />
      </DessertProvider>
    </div>
  );
};

export default App;
