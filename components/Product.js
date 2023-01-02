import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product(props) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  // const [isSSR, setIsSSR] = useState(true);
  // useEffect(() => {
  //   setIsSSR(false);
  // }, []);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id: props.id,
      title: props.title,
      price: props.price,
      description: props.description,
      category: props.category,
      image: props.image,
      hasPrime: hasPrime,
      rating: rating,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="flex relative flex-col m-5 bg-white z-30 p-10 items-center">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {props.category}
      </p>
      <Image
        src={props.image}
        alt=""
        height={200}
        width={200}
        objectFit="contain"
      />
      <h3 className="my-4">{props.title}</h3>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
          ))}
      </div>
      <p className="text-xs my-2">{props.description}</p>
      <div className="mb-5 ">
        <Currency quantity={props.price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png"
            alt=""
          />
          <p>FREE Next Day Delivery</p>
        </div>
      )}
      <button
        onClick={addItemToBasket}
        className="rounded-sm p-2 text-xs md:text-sm bg-yellow-200 hover:bg-yellow-500"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
