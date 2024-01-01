import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RelatedItem from './RelatedItem/RelatedItem';
import styles from './moreSeasons.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';


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
            {/* <Carousel
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
                itemClass="carousel-item-padding-50-px"> */}
                <Slider {...settings}>

                {items.map(item => {
                    return <RelatedItem key={item.id} details={item} seasonId={props.seasonId} type={params.type} />
                })
            }
            </Slider>
        </div>
    );
}

export default MoreSeasons;
