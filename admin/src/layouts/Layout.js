import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-app-color">
          {children}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;