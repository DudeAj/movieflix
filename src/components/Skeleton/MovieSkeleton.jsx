import React from "react";
import styles from "./MovieSkeleton.module.css";

const MovieSkeleton = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.SkeletonBox}>
        <div className={styles.SkeletonShimmer}></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
