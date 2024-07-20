import React, { useState, useEffect } from "react";
import { slides } from "../cards/NewReleaseData";
import "./NewReleaseCards.css";

export const LazySlider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };


    /* useeffect didn't understood just added. */
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);




    const containerStyle = {
        backgroundImage: `url(${slides[slideIndex].image})`,

    };

    return (
        <div className="">
            <div className="background-release-image" style={containerStyle}></div>
            <div className="content-release-box ">
                <div>

                    <div className="flex flex-wrap justify-evenly items-center pb-8">
                        <div className="w-96 h-96 slider-image">
                            <div className="relative w-full h-full aspect-w-2 aspect-h-2 slider-image">
                                <img
                                    key={slideIndex} // Force re-render of the image element
                                    src={slides[slideIndex].image}
                                    alt={slides[slideIndex].title}
                                    className="object-cover w-full h-full shadow-2xl slider-image"
                                />
                            </div>
                        </div>
                        <div className="w-96 text-center p-5 overflow-hidden slider-text">
                            <h2 className="text-4xl text-white font-bold text-clip pb-8 slider-text">{slides[slideIndex].title}</h2>
                            <p className="mt-2 text-sm text-white overflow-ellipsis pb-8 slider-text">{slides[slideIndex].description}</p>
                            <button className="border-2 rounded-full p-3 font-bold text-white hover:text-orange-200 hover:bg-slate-700 hover:opacity-90"> {slides[slideIndex].buttonName} </button>
                        </div>
                    </div>
                    <div className="border border-gray-500 m-8 sm:ml-80 sm:mr-80"></div>

                    <div className="flex justify-around mt-4 space-x-4">
                        <button
                            className="bg-opacity-50 text-white cursor-pointer hover:bg-opacity-80 "
                            onClick={prevSlide}
                        >
                            ←
                        </button>
                        <button
                            className="bg-opacity-50 text-white cursor-pointer hover:bg-opacity-80"
                            onClick={nextSlide}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};