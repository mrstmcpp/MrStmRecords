import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


const Footer = () => {



    return (
        <div>
            
            <div className="bg-footer-color p-4 flex justify-between items-center text-center ">
                <div className="font-semibold ml-8 text-rev-color">Mr Stm Records © 2024. All Rights Reserved.</div>
                <div className="flex space-x-8 mr-8">
                    <Link to="https://youtube.com/@mrstmmusic" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:youtube" className="text-2xl text-rev-color hover:text-gray-600" />
                    </Link>
                    <Link to="https://instagram.com/mrstmmusic" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:instagram" className="text-2xl text-rev-color hover:text-gray-600" />
                    </Link>
                    <Link to="https://soundcloud.com/mrstmmusic" target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:soundcloud" className="text-2xl text-rev-color hover:text-gray-600" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
