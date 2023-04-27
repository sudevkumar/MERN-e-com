import React from "react";
import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="text-center">
        <div className="text-center list-group">
          <h4>Admin Panel</h4>
          <Link
            to="/dashboard/user/profile"
            class="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            class="list-group-item list-group-item-action"
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
