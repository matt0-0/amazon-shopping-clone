import { CheckCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";

function success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank You, Your Order Has Been Confirmed!
            </h1>
          </div>
          <p>
            If you would like to check the status of your order, click the
            button below
          </p>
          <button
            className="rounded-sm p-2 text-xs md:text-sm bg-yellow-200 hover:bg-yellow-500 mt-8"
            onClick={() => router.push("/orders")}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
