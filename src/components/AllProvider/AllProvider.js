import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./allProvider.module.css";
import Slider from "react-slick";

const AllProvider = ({ items, handleProvider }) => {
  const originalURL = "https://image.tmdb.org/t/p/original";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 15,
    slidesToScroll: 8,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 12,
            slidesToScroll: 12,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        }
      ]
  };
  return (
    <Slider {...settings}>
      {items &&
        items.map((pro) => {
          return (
            <div
              className={styles.provider}
              key={pro.provider_id}
              onClick={() => handleProvider(pro.provider_id)}
            >
              <img src={originalURL + pro.logo_path} />
              {/* <p className={styles.Role}>{movieCast.character}</p> */}
            </div>
          );
        })}
    </Slider>
  );
  // <Carousel
  //     swipeable={true}
  //     draggable={false}
  //     responsive={responsive}
  //     ssr={true} // means to render carousel on server-side.
  //     autoPlaySpeed={1000}
  //     keyBoardControl={true}
  //     customTransition="all .5"
  //     transitionDuration={500}
  //     containerClass="carousel-container"
  //     removeArrowOnDeviceType={["tablet", "mobile"]}
  //     itemClass="carousel-item-padding-10-px"
  // >

  // </Carousel>
};

export default AllProvider;
