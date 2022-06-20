import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RelatedItem from './RelatedItem/RelatedItem';
import styles from './moreSeasons.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6
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

const MoreSeasons = (props) => {
    const params = useParams();
    const [items, setItems] = useState([])
    const collectionURL = props.collectionId ? `/3/collection/${props.collectionId}` : null;
    useEffect(() => {
        if (props.collectionId) {
            axios.get(collectionURL)
                .then(res => {
                    setItems(res.data.parts);
                })
                .catch(err => {

                })
        } else {
            setItems(props.data)
        }
    }, [])
    return (
        <div className={styles.TypeHolder}>
            <p className={styles.seasonHeading}>{items.length > 0 && (props.rowTitle ? props.rowTitle + ' Seasons' : 'More Parts')}</p>
            <Carousel
                swipeable={true}
                draggable={false}
                responsive={responsive}
                ssr={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-50-px">
                {items.map(item => {
                    return <RelatedItem key={item.id} details={item} seasonId={props.seasonId} type={params.type} />
                })
                }
            </Carousel>
        </div>
    );
}

export default MoreSeasons;
