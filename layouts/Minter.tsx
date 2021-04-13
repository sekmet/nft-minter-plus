import React from "react";
// components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
//import HeaderMinterStats from "../components/Headers/HeaderMinterStats";
//import FooterAdmin from "../components/Footers/FooterAdmin";

export default function Admin({ children }) {

    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          {children}
        </div>
      </>
    )
}
