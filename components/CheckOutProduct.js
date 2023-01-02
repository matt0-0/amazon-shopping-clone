import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckOutProduct(props) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id: props.id,
      title: props.title,
      price: props.price,
      description: props.description,
      category: props.category,
      image: props.image,
      hasPrime: props.hasPrime,
      rating: props.rating,
    };

    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    console.log(props.id);
    dispatch(removeFromBasket(props.id));
  };
  return (
    <div className="grid grid-cols-5 ">
      <Image
        src={props.image}
        height={200}
        width={200}
        objectFit="contain"
        alt=""
      />
      <div className="col-span-3 mx-5">
        <p>{props.title}</p>
        <div className="flex">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
            ))}
        </div>

        <p className="text-xs my-2">{props.description}</p>
        <Currency quantity={props.price} currency="USD" />
        {props.hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png"
              alt=""
            />
            <p>FREE Next Day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button
          onClick={addItemToBasket}
          className="rounded-sm p-2 text-xs md:text-sm bg-yellow-200 hover:bg-yellow-500"
        >
          Add to Basket
        </button>
        <button
          onClick={removeItemFromBasket}
          className="rounded-sm p-2 text-xs md:text-sm bg-yellow-200 hover:bg-yellow-500"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
