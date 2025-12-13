import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./genre.module.css";
import loadingStyles from "../../components/Skeleton/LoadingIndicator.module.css";
import MovieItem from "../../components/MovieItems/MovieItem/MovieItem";
import useSWR from "swr";
import { axiosFetcher } from "../../utils/fetcher";
import * as actions from "../../store/actions";
import AllProvider from "../../components/AllProvider/AllProvider";
import MovieSkeleton from "../../components/Skeleton/MovieSkeleton";
import Popover from "@mui/material/Popover";
import { Button, Slider } from "@mui/material";

const Genre = (props) => {
  const activeClass = [styles.active];
  const movieType = useRef();
  const tvType = useRef();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [type, setType] = useState("movie");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [releaseYear, setReleaseYear] = useState([
    2000,
    new Date().getFullYear(),
  ]);
  const loadMoreRef = useRef(null);

  //popover setup for release year
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openYear = Boolean(anchorEl);

  //popover setup for genre
  const [anchorElGenre, setAnchorElGenre] = React.useState(null);

  const handleGenre = (event) => {
    setAnchorElGenre(event.currentTarget);
  };

  const genreClose = () => {
    setAnchorElGenre(null);
  };

  const openGenre = Boolean(anchorElGenre);

  // Build filter query
  let filterGenre = "";
  let filterYear = "";

  if (selectedGenre.length > 0) {
    filterGenre = "&with_genres=" + selectedGenre.join(",");
  }

  if (releaseYear !== 0) {
    filterYear =
      "&release_date.gte=" +
      releaseYear[0] +
      "&release_date.lte=" +
      releaseYear[1];
  }

  // Construct the API URL based on type and filters
  const apiUrl =
    type === "movie"
      ? `/3/discover/movie?page=${page}${filterYear}${filterGenre}${selectedProvider}&include_adult=false`
      : `/3/discover/tv?page=${page}${filterYear}${filterGenre}${selectedProvider}&include_adult=false`;

  // Fetch data using SWR
  const { data, isLoading } = useSWR(apiUrl, axiosFetcher);

  // Load genre and providers from Redux (reference data)
  useEffect(() => {
    props.getAllProviders(type);
    props.loadGenre(type);
  }, [type]);

  // Reset page and movies when filters change
  useEffect(() => {
    setPage(1);
    setAllMovies([]);
  }, [type, selectedProvider, selectedGenre, releaseYear]);

  // When new data arrives, append it to the state
  useEffect(() => {
    if (data?.results) {
      setAllMovies((prevMovies) => {
        // If it's the first page, replace; otherwise append
        if (page === 1) {
          return data.results;
        } else {
          return [...prevMovies, ...data.results];
        }
      });
    }
  }, [data, page]);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel element is visible and not currently loading
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          data?.results?.length > 0
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading, data]);

  const handleTypeChange = (filterType) => {
    if (filterType === "movie") {
      setType("movie");
      movieType.current.className = activeClass;
      tvType.current.className = "";
    }

    if (filterType === "tv") {
      setType("tv");
      tvType.current.className = activeClass;
      movieType.current.className = "";
    }
  };

  const handleSetGenre = (id) => {
    if (selectedGenre.includes(id)) {
      const latestGenre = selectedGenre.filter((genre) => genre !== id);
      setSelectedGenre(latestGenre);
    } else {
      const latestGenre = [...selectedGenre, id];
      setSelectedGenre(latestGenre);
    }
  };

  const selectedItems = (item) => {
    let selectedClass;
    if (selectedGenre.includes(item.id)) {
      selectedClass = styles.genreOption + " " + styles.selected;
    } else {
      selectedClass = styles.genreOption + " " + styles.unselected;
    }
    return (
      <div
        className={selectedClass}
        key={item.id}
        onClick={() => handleSetGenre(item.id)}
      >
        {item.name}
      </div>
    );
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleYearChange = (event, year) => {
    setReleaseYear(year);
  };

  const setProvider = (id) => {
    setSelectedProvider(`&with_watch_providers=${id}`);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.Heading}>Filter By Genre</h3>
      <div className={styles.providerHolder}>
        <AllProvider items={props.allProvider} handleProvider={setProvider} />
      </div>

      <div className={styles.FilterArea}>
        <div className={styles.Type}>
          <h5 ref={movieType} onClick={() => handleTypeChange("movie")}>
            Movies
          </h5>
          <h5 ref={tvType} onClick={() => handleTypeChange("tv")}>
            Series
          </h5>
        </div>
        <div className={styles.Type}>
          {/* For Release Year */}
          <div className={styles.typeBtnHolder}>
            <Button sx={{ mx: 1 }} variant="contained" onClick={handleClick}>
              Release Year
            </Button>
            <Popover
              open={openYear}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className={styles.popupforRelease}>
                <div className={styles.row}>
                  <span className="col-6 text-start">1900</span>
                  <span className="col-6 text-end">
                    {new Date().getFullYear()}
                  </span>
                </div>
                <Slider
                  min={1900}
                  max={new Date().getFullYear()}
                  value={releaseYear}
                  onChange={handleYearChange}
                  valueLabelDisplay="auto"
                  size="small"
                  getAriaValueText={valuetext}
                />
              </div>
            </Popover>
          </div>
          {/* For Genre */}
          <div className={styles.typeBtnHolder}>
            <Button sx={{ mx: 1 }} variant="contained" onClick={handleGenre}>
              Genre
            </Button>
            <Popover
              open={openGenre}
              anchorEl={anchorElGenre}
              onClose={genreClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className={styles.popupforGenre}>
                <div className={styles.genreRow}>
                  {props.genre.map((item) => {
                    return selectedItems(item);
                  })}
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>

      <div className={styles.DataContainer}>
        {page === 1 && isLoading
          ? [...Array(20)].map((_, i) => <MovieSkeleton key={i} />)
          : allMovies.map((item, index) => (
              <MovieItem key={`${item.id}-${index}`} data={item} />
            ))}
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={loadMoreRef} className={loadingStyles.loadMoreSentinel}>
        {isLoading && page > 1 && (
          <div className={loadingStyles.loadingIndicator}>
            <div className={loadingStyles.spinner}></div>
            <p>Loading more...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProvider: state.provider.allProviders,
    genre: state.movie.genre,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGenre: (type) => dispatch(actions.getGenre(type)),
    getAllProviders: (type) => dispatch(actions.getAllProviders(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
