import { useState } from "react";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <div>
      <h2>Finance Tracker</h2>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
