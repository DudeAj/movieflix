import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from "./MovieItem/MovieItem";
import styles from "./MovieItems.module.css";
import axios from "axios";
import Slider from "react-slick";
import useSWR from "swr";
import { axiosFetcher } from "../../utils/fetcher";
import MovieSkeleton from "../Skeleton/MovieSkeleton";

const MovieItems = (props) => {
  const { data, error, isLoading } = useSWR(props.link, axiosFetcher);
  const settings = {
    dots: true,
    infinite: true,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className={styles.TypeHolder}>
      <p>{props.rowTitle}</p>
      {
        <Slider {...settings}>
          {isLoading
            ? [...Array(10)].map((_, i) => <MovieSkeleton key={i} />)
            : data?.results?.map((item) => {
                return <MovieItem key={item.id} data={item} />;
              })}
        </Slider>
      }
    </div>
  );
};

export default MovieItems;
