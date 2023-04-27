import React from "react";
import Layout from "../components/Layouts/Layout";
import AminMenu from "./AminMenu";

function CreareProduct() {
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default CreareProduct;
