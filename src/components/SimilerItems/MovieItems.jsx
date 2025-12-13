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
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
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
                setItems(res.data.results);
            })
            .catch(err => {

            })
    }, [])

    return (
        <div className={styles.TypeHolder}>

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

                {items.map(item => {
                    return <MovieItem key={item.id} data={item} />
                })}

                </Slider>
            {/* </Carousel> */}
        </div>
    )
}

export default MovieItems
