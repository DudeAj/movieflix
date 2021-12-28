import React, {useState, useEffect} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieItem from './MovieItem/MovieItem';
import styles from './MovieItems.module.css';
import axios from 'axios';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
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

    useEffect(()=> {
        axios.get(props.link)
            .then(res=>{
                setItems(res.data.results);
            })
            .catch(err=> {
                console.log(err)
            })
    },[])
    
    return (
        <div className={styles.TypeHolder}>
            
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
                {items.map(item=> {
                    return <MovieItem key={item.id} data={item}/>
                })}
                
            </Carousel>
        </div>
    )
}

export default MovieItems
