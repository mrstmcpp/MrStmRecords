import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
                <div style={{ paddingTop: '120px' }} className="bg-app-color">
                    {children}
                </div>
            <Footer />
        </>
    )
}

export default Layout;