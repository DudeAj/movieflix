import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './allProvider.module.css';

const AllProvider = ({ items, handleProvider }) => {
    const originalURL = 'https://image.tmdb.org/t/p/original';
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1366 },
            items: 17
        },
        desktop: {
            breakpoint: { max: 1366, min: 1024 },
            items: 14
        },
        tablet: {
            breakpoint: { max: 1024, min: 700 },
            items: 8
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 7
        }
    };
    return <Carousel
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
        itemClass="carousel-item-padding-10-px"
    >
        {items && items.map(pro => {
            return <div className={styles.provider} key={pro.provider_id} onClick={() => handleProvider(pro.provider_id)}>
                <img src={originalURL + pro.logo_path} />
                {/* <p className={styles.Role}>{movieCast.character}</p> */}
            </div>
        })}
    </Carousel>
}

export default AllProvider;