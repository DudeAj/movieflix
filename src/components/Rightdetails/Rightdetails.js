import React from 'react';
import { connect } from 'react-redux';
import styles from './Rightdetails.module.css';
import ProviderType from '../ProviderType/ProviderType';
import MoreSeasons from '../moreSeasons/moreSeasons';
import * as action from '../../store/actions/index'
import Cast from '../Cast/Cast';
import SimilerItem from '../SimilerItems/MovieItems';
import { useParams } from 'react-router-dom';
import Episodes from '../Episodes/Episodes';

const Rightdetails = (props) => {
    const { flatrate, rent, buy } = props.watchProviders;
    const params = useParams();
    const similerLink = `https://api.themoviedb.org/3/${params.type}/${params.id}/similar?page=1`;
    const getSelectValue = e => {
        props.updateCountry(e.target.value)
    }
    const seasonNumber = params.season ? params.season.split('-')[1] : null;
    return (
        <div className={styles.Right}>
            <div className={styles.rightHolder}>
                <h1>{props.item.title || props.item.name} {seasonNumber && "- Season "+ seasonNumber}<span className={styles.releaseData}> {props.item.first_air_date ? `(${props.item.first_air_date.slice(0, 4)})` : null}</span></h1>
                <p className={styles.originalTitle}>Original Title: {props.item.original_name || props.item.original_title}</p>
                {/* Used for Showing season */}
                {!seasonNumber && (props.item.seasons
                    ? <MoreSeasons rowTitle={props.item.number_of_seasons} data={props.item.seasons} seasonId={props.item.id} />
                    : props.item.belongs_to_collection !== null && <MoreSeasons collectionId={props.item.belongs_to_collection.id} />
                )}

                <div className={styles.watchHeader}>
                    <span className={styles.watchProviders}>Watch Providers</span>
                    {Object.keys(props.watchProvider).length !== 0 && <div className={styles.Stream}>
                        <span>Streaming In:</span>
                        <select multiple={false} value={props.countryCode} onChange={getSelectValue}>
                            {Object.keys(props.watchProvider).map(cnID => {
                                return <option key={cnID} value={cnID}>{cnID}</option>
                            })}
                        </select>
                    </div>}
                </div>
                {flatrate ? <ProviderType items={flatrate} /> : null}
                {rent ? <ProviderType items={rent} /> : null}
                {buy ? <ProviderType items={buy} /> : null}
                {seasonNumber && <Episodes />}
                <Cast heading='Cast' />
                <div className={styles.synopsis}>
                    <p>SYNOPSIS</p>
                    <p className={styles.overview}>{props.item.overview}</p>
                </div>
                <div className={styles.RelatedItems}>
                    <p>People Who Like {props.item.title || props.item.name} Also Liked</p>
                    <SimilerItem link={similerLink} />
                </div>

            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        countryCode: state.user.country_code,
        watchProvider: state.provider.watch_providers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCountry: (code) => dispatch(action.updateCountry(code)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rightdetails);
