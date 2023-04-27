import React from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth.context";

function Home() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Brand Bazar - Shop Now"}>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
}

export default Home;
