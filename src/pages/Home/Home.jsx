import { connect } from "react-redux";
import MovieItems from "../../components/MovieItems/MovieItems";

const Home = () => {
  const trendinglink = "/3/trending/all/day";
  const PopularMovie = "/3/movie/popular?page=1";
  const PopularTv = "/3/tv/popular?language=en-US&page=1";
  const latestMovie = "/3/discover/movie?include_adult=false";
  const latestTv = "/3/discover/tv?include_adult=false";
  const tvMovie = "/3/discover/tv?include_adult=false";
  const collection = "/3/collection/10?include_adult=false";

  const items = (
    <div>
      <MovieItems rowTitle="Trending On Internet" link={trendinglink} />
      <MovieItems rowTitle="Tv Shows You Might Like" link={PopularTv} />
      <MovieItems
        rowTitle="Action"
        link={latestMovie + "&sort_by=popularity.desc&with_genres=28"}
      />
      <MovieItems rowTitle="Horror" link={PopularTv + "&with_genres=80"} />
      <MovieItems rowTitle="Comedy" link={PopularTv + "&with_genres=35"} />
      <MovieItems
        rowTitle="Romance"
        link={latestTv + "&sort_by=popularity.desc&with_genres=10749"}
      />
      <MovieItems rowTitle="Star Wars" link={collection} />
    </div>
  );
  return items;
};

const mapStateToProps = (state) => {
  return {
    trending: state.movie.trending,
  };
};

export default connect(mapStateToProps)(Home);
