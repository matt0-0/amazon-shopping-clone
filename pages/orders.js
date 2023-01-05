import { getSession, useSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";
import db from "../firebase";

import moment from "moment";
import Order from "../components/Order";

function Orders(props) {
  const { data: session, status } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <h1> Your Orders</h1>

        {session ? (
          <h2>{props.orders.length} Orders</h2>
        ) : (
          <h2> Please sign in to see your orders</h2>
        )}

        <div>
          {props.orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get users logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // get firebase data
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // get stripe data
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
