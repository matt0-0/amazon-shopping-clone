import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home(props) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <>
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto bg-gray-100">
        {!isSSR && <ProductFeed products={props.products} />}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products: products,
    },
  };
}
