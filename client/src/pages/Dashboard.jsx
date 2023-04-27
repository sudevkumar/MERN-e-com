import React from "react";
import Layout from "../components/Layouts/Layout";
import UserMenu from "../components/Layouts/UserMenu";
import { useAuth } from "../context/auth.context";

function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Brand Bazar"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name : {auth?.user?.name}</h3>
              <h3>User Email : {auth?.user?.email}</h3>
              <h3>User Contact : {auth?.user?.phone}</h3>
              <h3>User Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
