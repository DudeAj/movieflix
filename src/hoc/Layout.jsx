import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../components/footer/footer';
import Footer from '../components/footer2/footer2';
import Header from '../components/header/header';

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout