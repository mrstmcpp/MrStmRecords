import React, { useState } from "react";
import { Audio } from "react-loader-spinner";

const ImageWithLoader = ({ src, alt, className }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full flex justify-center items-center">
            {loading && (
                <div className="absolute">
                    <Audio
                        visible={true}
                        height="40"
                        width="40"
                        color="#F97316"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                onLoad={() => setLoading(false)}
                loading="lazy"
            />
        </div>
    );
};

export default ImageWithLoader;
