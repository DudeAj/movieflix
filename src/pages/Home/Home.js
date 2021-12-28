import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MovieItems from '../../components/MovieItems/MovieItems';
import Spinner from '../../components/Spinner/spinner';


const Home = (props) => {
    const [watch, setWatch ] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const trendinglink = 'https://api.themoviedb.org/3/trending/all/day?api_key=2572250a3cd36f9f144b61d06877ba1d&watch_region=IN';
    const PopularMovie = "https://api.themoviedb.org/3/movie/popular?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&page=1&watch_region=IN";
    const PopularTv = "https://api.themoviedb.org/3/tv/popular?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&page=1&watch_region=IN";
    const latestMovie ="https://api.themoviedb.org/3/discover/movie?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=false&watch_region=IN";
    const latestTv ="https://api.themoviedb.org/3/discover/tv?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=false&watch_region=IN";
    const tvMovie = "https://api.themoviedb.org/3/discover/tv?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=true&watch_region=IN";
    
    useEffect(() => {
        axios.get(trendinglink)
        .then(res=> {
            setTimeout(() => {
                setLoading(false)    
            }, 2000);
            
        }).
        catch(err=> {
            console.log(err);
            setLoading(false);
        })
    }, [])

    const items = (<div><MovieItems rowTitle="Trending On Internet" link={trendinglink}/>
                        <MovieItems rowTitle="Tv Shows You Might Like" link={PopularTv} />
                        <MovieItems rowTitle="Action" link={latestMovie+"&sort_by=popularity.desc&with_genres=28"} />
                        <MovieItems rowTitle="Horror" link={PopularTv+"&with_genres=80"} />
                        <MovieItems rowTitle="Comedy" link={PopularTv+"&with_genres=35"} />
                        <MovieItems rowTitle="Romance" link={latestTv+"&sort_by=popularity.desc&with_genres=10749"} />
                        <MovieItems rowTitle="War" link={PopularTv+"&with_genres=10752"} />
                        
                    </div>);
    return (loading ? <Spinner/> : items)
}

const mapStateToProps = state => {
    return {
        trending: state.movie.trending
    }
}

export default connect(mapStateToProps)(Home);
