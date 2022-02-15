import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from './Cast.module.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import placeHolderImage from '../../assets/images/placeholderImage.png'

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8
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

const Cast = (props) => {
    const params = useParams();
    const [cast, setCast] = useState([]);
    const castUrl = `https://api.themoviedb.org/3/${params.type}/${params.id}/credits?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US`;
    const castImg = `https://www.themoviedb.org/t/p/w220_and_h330_face`;

    useEffect(() => {
        axios.get(castUrl)
            .then(res => {
                
                setCast(res.data.cast)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className={styles.PeopleContainer}>
            <span>{props.heading}</span>
            <div className={styles.DataHolder}>
            <Carousel
                swipeable={false}
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
            >
                {cast && cast.map(movieCast => {
                    return <div className={styles.peopleholder} key={movieCast.id}>
                        {movieCast.profile_path ? <img src={castImg+movieCast.profile_path}/> : <img src={placeHolderImage}/>}
                        <p className={styles.Name}>{movieCast.name}</p>
                        {/* <p className={styles.Role}>{movieCast.character}</p> */}
                    </div>
                })}
                </Carousel>
            </div>
        </div>
    )
}

export default Cast;
