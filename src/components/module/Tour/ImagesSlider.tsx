"use client";

import React from 'react';
import Slider, { CustomArrowProps } from "react-slick"; // Import CustomArrowProps from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import 'react-photo-view/dist/react-photo-view.css';
import { GiClick } from "react-icons/gi";

// --- Custom Arrow Components with Types ---

// Use React.FC<CustomArrowProps> for type definition
const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      className="p_prev_btn z-10 w-8 h-8 rounded-full bg-[#ffffffa7] absolute bottom-5 right-20 text-primary flex items-center justify-center shadow"
      onClick={onClick}
      type="button" // Good practice for accessibility and form submission
      aria-label="Previous Slide"
    >
      <FaArrowLeft className="text-base md:text-xl" />
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      className="p_next_btn z-10 w-8 h-8 rounded-full bg-[#ffffffa7] absolute bottom-5 right-4 text-primary flex items-center justify-center shadow"
      onClick={onClick}
      type="button" // Good practice for accessibility and form submission
      aria-label="Next Slide"
    >
      <FaArrowRight className="text-lg font-bold" />
    </button>
  );
};

// --- Main ImageSlider Component with Types ---

// Define the expected props for the main component
interface ImageSliderProps {
    images: string[]; // Assuming 'images' is an array of strings (URLs)
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the interval to 3 seconds
  };

  return (
    <PhotoProvider>
      <Slider {...settings}>
        {images.map((item, i) => {
          return (
            <div key={i} className="image_wrap relative">
              <span className="click_icon animate-bounce text-white font-bold text-xl md:text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <GiClick />
              </span>
              <PhotoView src={item}>
                <div className="w-full aspect-video">
                  <Image
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover cursor-pointer"
                    src={item}
                    alt={`Project image ${i + 1}`}
                  />
                </div>
              </PhotoView>
            </div>
          );
        })}
      </Slider>
    </PhotoProvider>
  );
};

export default ImageSlider;