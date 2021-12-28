import React from 'react';
import pageContainer from './pageContainer.module.css';
import Home from '../../pages/Home/Home';
import TopContainer from '../../components/TopContainer/topContainer';

const PagesContainer = () => {
    return (
        <div className={pageContainer.container}>
            <TopContainer/>
            <Home/>
        </div>
    )
}

export default PagesContainer
