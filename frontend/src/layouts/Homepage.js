import React from "react";
import Layout from "./Layout";
import { HomeCards } from "../components/shared/HomeCards";


const Homepage = () => {
    return (
        <Layout>
            <div className='bg-app-color py-20'>
                
                <div className="flex items-center justify-center space-x-4">
                    <HomeCards text="Sample Text" urlImage="https://static.vecteezy.com/system/resources/thumbnails/037/044/052/small_2x/ai-generated-studio-shot-of-black-headphones-over-music-note-explosion-background-with-empty-space-for-text-photo.jpg" artist="Mr Stm" genre="MAINSTAGE"/>
                    <HomeCards text="Sample Text" urlImage="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-pair-of-headphones-on-the-water-at-nighttime-image_2931863.jpg" artist="Mr Stm" genre="MAINSTAGE"/>
                    <HomeCards text="Sample Text" urlImage="https://t3.ftcdn.net/jpg/05/62/98/36/360_F_562983674_524xR5Rzurt8MjTQghCvNYBcyeuvLHPE.jpg" artist="Mr Stm" genre="MAINSTAGE"/>
                    <HomeCards text="Sample Text" urlImage="https://cache.desktopnexus.com/thumbseg/1597/1597682-bigthumbnail.jpg" artist="Mr Stm" genre="MAINSTAGE"/>
                    <HomeCards text="Sample Text" urlImage="https://wallpapers.com/images/hd/people-and-music-phone-597tfo98qlhx2xbp.jpg" artist="Mr Stm" genre="MAINSTAGE"/>
                </div>
            </div>
        </Layout>
    )
}

export default Homepage;