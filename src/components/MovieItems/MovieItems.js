import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from './MovieItem/MovieItem';
import styles from './MovieItems.module.css';
import axios from 'axios';
import Slider from 'react-slick';

const MovieItems = (props) => {

    const [items, setItems] = useState([]);

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
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]
      };


    useEffect(() => {
        axios.get(props.link)
            .then(res => {
                const result = res.data.results ? res.data.results : res.data.parts;
                setItems(result);
            })
            .catch(err => {

            })
    }, [])

    return (
        <div className={styles.TypeHolder}>
            <p>{props.rowTitle}</p>

            {/* <Carousel
                swipeable={true}
                draggable={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px"> */}
                <Slider {...settings}>

                {items.map(item => {
                    return <MovieItem key={item.id} data={item} />
                })}
                </Slider>

            {/* </Carousel> */}
        </div>
    )
}

export default MovieItems
