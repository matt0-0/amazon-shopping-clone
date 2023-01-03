import React from "react";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckOutProduct from "../components/CheckOutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe();

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession();

  const createCheckoutSession = () => {};
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex flex-col p-5 space-y-10 bg-white">
          <h1 className="text-3xl border-b pb-4">
            {items.length === 0
              ? "Your Amazon Basket is Empty"
              : "Shopping Basket"}
          </h1>
          {/* HAS TO BE SURROUNDED BY PARENTHESIS NOT { }*/}
          {items.map((item, i) => (
            <CheckOutProduct
              key={i}
              id={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              hasPrime={item.hasPrime}
            />
          ))}
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>
              {/*If there is a session, you are allowed to checkout. If not logged in, you cannot */}
              <button
                role="link"
                disabled={!session}
                className={`mt-2
        rounded-sm p-2 text-xs md:text-sm bg-yellow-200 hover:bg-yellow-500
${!session && "bg-gray-800 text-gray-300 cursor-not-allowed"}`}
              >
                {!session ? "Sign In to Check Out" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
