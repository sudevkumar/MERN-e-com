import React from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth.context";
import AminMenu from "./AminMenu";

function AdminDashBoard() {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - Brand Bazar"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashBoard;
