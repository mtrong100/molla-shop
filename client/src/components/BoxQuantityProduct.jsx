import React, { useState } from "react";

const BoxQuantityProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="border border-gray-500 w-fit rounded-md h-[50px] flex items-center ">
      <button
        className="text-2xl font-medium w-[50px] h-[50px]"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="mx-4">{quantity}</span>
      <button
        className="text-2xl font-medium w-[50px] h-[50px]"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default BoxQuantityProduct;
