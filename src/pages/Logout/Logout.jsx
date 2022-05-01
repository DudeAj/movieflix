import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../../store/actions';
import { Navigate } from 'react-router-dom';

const Logout = (props) => {

    useEffect(() => {
        props.logout();
    }, []);

    return <Navigate to="/" />
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LogoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout)