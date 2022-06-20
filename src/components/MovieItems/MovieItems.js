import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from './MovieItem/MovieItem';
import styles from './MovieItems.module.css';
import axios from 'axios';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1366 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 1366, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 700 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 3
    }
};

const MovieItems = (props) => {

    const [items, setItems] = useState([]);


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

            <Carousel
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
                itemClass="carousel-item-padding-40-px">
                {items.map(item => {
                    return <MovieItem key={item.id} data={item} />
                })}

            </Carousel>
        </div>
    )
}

export default MovieItems
