import React from "react";
import { Link } from "react-router-dom";

function AminMenu() {
  return (
    <>
      <div className="text-centeR">
        <div className="text-center list-group">
          <h4>Admin Panel</h4>
          <Link
            to="/dashboard/admin/create-category"
            class="list-group-item list-group-item-action"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            class="list-group-item list-group-item-action"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/users"
            class="list-group-item list-group-item-action"
          >
            User
          </Link>
        </div>
      </div>
    </>
  );
}

export default AminMenu;
