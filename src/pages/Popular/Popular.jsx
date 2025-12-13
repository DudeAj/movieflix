import React, { useState, useEffect, useRef } from "react";
import styles from "./Popular.module.css";
import loadingStyles from "../../components/Skeleton/LoadingIndicator.module.css";
import MovieItem from "../../components/MovieItems/MovieItem/MovieItem";
import useSWR from "swr";
import { axiosFetcher } from "../../utils/fetcher";
import MovieSkeleton from "../../components/Skeleton/MovieSkeleton";

const arrayShuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const Popular = () => {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const loadMoreRef = useRef(null);

  // Fetch only the current page
  const { data: movieData, isLoading: movieLoading } = useSWR(
    `/3/movie/popular?page=${page}`,
    axiosFetcher
  );

  const { data: tvData, isLoading: tvLoading } = useSWR(
    `/3/tv/popular?language=en-US&page=${page}`,
    axiosFetcher
  );

  const isLoading = movieLoading || tvLoading;

  // When new data arrives, append it to the state
  useEffect(() => {
    if (movieData?.results && tvData?.results) {
      const newMovies = [...movieData.results, ...tvData.results];
      const shuffledNew = arrayShuffle(newMovies);

      setAllMovies((prevMovies) => {
        // If it's the first page, replace; otherwise append
        if (page === 1) {
          return shuffledNew;
        } else {
          return [...prevMovies, ...shuffledNew];
        }
      });
    }
  }, [movieData, tvData, page]);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel element is visible and not currently loading
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "100px", // Start loading 100px before reaching the bottom
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
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <h3 className={styles.Heading}>Popular Movies</h3>

      <div className={styles.DataContainer}>
        {page === 1 && isLoading
          ? // Show skeletons only on initial load
            [...Array(20)].map((_, i) => <MovieSkeleton key={i} />)
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

export default Popular;
