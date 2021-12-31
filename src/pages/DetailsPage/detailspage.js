import styles from '../DetailsPage/detailspage.module.css';
import React, { useEffect, memo } from 'react';
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { connect } from 'react-redux';
import * as action from '../../store/actions';
import Spinner from '../../components/Spinner/spinner';
import Leftdetails from '../../components/Leftdetails/leftdetails';
import Rightdetails from '../../components/Rightdetails/Rightdetails';
import { useState } from 'react';

const Detailspage = (props) => {

    const params = useParams();
    console.log(params)
    const [parm, setParm] = useState(0);
    const [sea,setSea] = useState("")
    const seasonNumber = params.season ? params.season.split('-')[1] : null;
    const movielink = `https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US`;
    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
    const originalURL = 'https://image.tmdb.org/t/p/original';
    const seasonDetailsLink = `https://api.themoviedb.org/3/${params.type}/${params.id}/season/${seasonNumber}?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US` || null;

    useEffect(() => {
       if(params.id !== parm || params.season !== sea) {
           setParm(params.id);
           setSea(params.season);
           datalink();
       }
        
    }, [params.id, params.season]);

    const datalink = () => {
        props.onItemLoad(movielink);
        props.updateProvider(params.type, params.id)
        if (seasonNumber) {
            props.onLoadEpisode(seasonDetailsLink);
        }
    }

    const providers = { ...props.watchProviders[props.countryCode] };
    let data = (
        <div className={styles.pageHolder} style={{ backgroundImage: `url(${originalURL + props.item.backdrop_path})` }}>
            <div className={styles.dataSet}>
                <div className={styles.container}>
                    <Leftdetails item={props.item} seasonNumber={seasonNumber} />
                    <Rightdetails item={props.item} watchProviders={providers} />
                </div>
            </div>
        </div>
    );

    return props.loading ? <Spinner /> : data
}

const mapStateToProps = state => {
    return {
        countryCode: state.user.country_code,
        watchProviders: state.provider.watch_providers,
        item: state.item.item,
        loading: state.item.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCountry: (code) => dispatch(action.updateCountry(code)),
        updateProvider: (type, id) => dispatch(action.getWatchProviders(type, id)),
        onItemLoad: (link) => dispatch(action.getItem(link)),
        onLoadEpisode: (link) => dispatch(action.getEpisodes(link))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Detailspage))