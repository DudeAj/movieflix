import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../../store/actions';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth';
const Logout = (props) => {

    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        authCtx.logout();
    }, []);

    return <Navigate to="/" />
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LogoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout)