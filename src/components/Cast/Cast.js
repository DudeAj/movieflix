import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import placeHolderImage from "../../assets/images/placeholderImage.png";
import Slider from "react-slick";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 3,
  },
};

const Cast = (props) => {
  const params = useParams();
  const [cast, setCast] = useState([]);
  const castUrl = `/3/${params.type}/${params.id}/credits`;
  const castImg = `https://www.themoviedb.org/t/p/w220_and_h330_face`;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
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
        <Slider {...settings}>
          {cast &&
            cast.map((movieCast) => {
              return (
                <div className={styles.peopleholder} key={movieCast.id}>
                  <img
                    alt="alt text"
                    src={
                      movieCast.profile_path
                        ? castImg + movieCast.profile_path
                        : placeHolderImage
                    }
                    loading="lazy"
                  />
                  <span className={styles.Name}>{movieCast.name}</span>
                  {/* <p className={styles.Role}>{movieCast.character}</p> */}
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Cast;
