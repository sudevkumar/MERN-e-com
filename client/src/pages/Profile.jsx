import React from "react";
import Layout from "../components/Layouts/Layout";
import UserMenu from "../components/Layouts/UserMenu";

function Profile() {
  return (
    <Layout title={"Your Profile - Brand Bazar"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
