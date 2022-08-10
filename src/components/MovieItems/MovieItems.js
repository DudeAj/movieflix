import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from "./MovieItem/MovieItem";
import styles from "./MovieItems.module.css";
import axios from "axios";
import Slider from "react-slick";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1366 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1366, min: 1024 },
    items: 5,
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

const MovieItems = (props) => {
  const [items, setItems] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(props.link)
      .then((res) => {
        const result = res.data.results ? res.data.results : res.data.parts;
        setItems(result);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles.TypeHolder}>
      <p>{props.rowTitle}</p>
      <Slider {...settings}>
        {items.map((item) => {
          return <MovieItem key={item.id} data={item} />;
        })}
      </Slider>
    </div>
  );
};

export default MovieItems;
