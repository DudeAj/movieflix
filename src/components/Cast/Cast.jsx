import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import placeHolderImage from "../../assets/images/placeholderImage.png";
import Slider from "react-slick";

const Cast = (props) => {
  const params = useParams();
  const [cast, setCast] = useState([]);
  const castUrl = `/3/${params.type}/${params.id}/credits`;
  const castImg = `https://www.themoviedb.org/t/p/w220_and_h330_face`;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        }
      ]
  };

  useEffect(() => {
    axios
      .get(castUrl)
      .then((res) => {
        setCast(res.data.cast);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className={styles.PeopleContainer}>
      <span>{props.heading}</span>
      <div className={styles.DataHolder}>
        {/* <Carousel
                    swipeable={true}
                    draggable={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="carousel-item-padding-50-px"
                > */}
        <Slider {...settings}>
          {cast &&
            cast.map((movieCast) => {
              return (
                <div>
                  <div className={styles.peopleholder} key={movieCast.id}>
                    <img
                      src={
                        movieCast.profile_path
                          ? castImg + movieCast.profile_path
                          : placeHolderImage
                      }
                    />
                    <span className={styles.Name}>{movieCast.name}</span>
                    {/* <p className={styles.Role}>{movieCast.character}</p> */}
                  </div>
                </div>
              );
            })}
        </Slider>
        {/* </Carousel> */}
      </div>
    </div>
  );
};

export default Cast;
