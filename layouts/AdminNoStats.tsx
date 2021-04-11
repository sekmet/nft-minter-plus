import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import FooterAdmin from "../components/Footers/FooterAdmin";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <AdminNavbar />
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          {children}
        </div>
      </div>
    </>
  );
}
