import React from "react";
import Layout from "../../layouts/Layout";
import { Link } from "react-router-dom";
const Admin = () => {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center">
                <p className="text-2xl">Admin Page</p>
                <p className="text-xl">
                    <Link to={"/upload"} >
                        Upload Song
                    </Link>
                </p>


            </div>
        </Layout>
    );
}

export default Admin;
