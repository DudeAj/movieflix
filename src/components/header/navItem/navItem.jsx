import React from 'react';
import {NavLink } from 'react-router-dom';
import './navitem.css';

const navItem = (props) => {
    //let activeclass = [styles.link, active]
    return <NavLink to={props.value} className='link'><li>{props.title}</li></NavLink>
}

export default navItem
