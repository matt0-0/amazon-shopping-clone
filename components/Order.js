import moment from "moment";
import Currency from "react-currency-formatter";
import React from "react";

function Order(props) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p>ORDER PLACED</p>
          <p>{moment.unix(props.timestamp).format("DD MM YYYY")}</p>
        </div>

        <div>
          <p>TOTAL</p>
          <p>
            <Currency quantity={props.amount} currency="USD" />
          </p>
        </div>

        <p>{props.items.length} items</p>

        <p>ORDER # {props.id}</p>

        <div className=" p-5 sm:p=10">
          <div className="flex space-x-6 overflow-x-auto">
            {props.images.map((image) => (
              <img src={image} alt="" className="h-20 object-contain sm:h-32" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
