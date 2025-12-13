import { CircularProgress } from '@mui/material'
import React from 'react'
import styles from './loader.module.css';

const Loader = ({size=20}) => {
  return (
    <CircularProgress size={size}/>
  )
}

export const AdvanceLoader = () => {
    return <div className={styles.loaderContainer}>
        <Loader size={30} />
    </div>
}


export default Loader