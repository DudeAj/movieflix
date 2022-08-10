import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./allProvider.module.css";
import Slider from "react-slick";

const AllProvider = ({ items, handleProvider }) => {
  const originalURL = "https://image.tmdb.org/t/p/original";
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1366 },
      items: 17,
    },
    desktop: {
      breakpoint: { max: 1366, min: 1024 },
      items: 14,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 8,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 7,
    },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 18,
    slidesToScroll: 9,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
    ],
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {items &&
          items.map((pro) => {
            return (
              <div
                className={styles.provider}
                key={pro.provider_id}
                onClick={() => handleProvider(pro.provider_id)}
              >
                <img src={originalURL + pro.logo_path} loading="lazy"/>
                {/* <p className={styles.Role}>{movieCast.character}</p> */}
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default AllProvider;
