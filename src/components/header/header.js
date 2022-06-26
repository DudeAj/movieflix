import header from './header.module.css';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './search/search';
import Logo from '../../assets/images/movieflix.png';
import NavItem from './navItem/navItem';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthContext from '../../context/auth';
import DialogComp from '../UI/Dialog/Dialog';
import Login from '../../pages/Login/Login';
import { setSigninPopup } from '../../store/actions';
const Header = (props) => {
    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (authCtx.isLoggedin) {
            props.openPopup(!authCtx.isLoggedin)
        }
    }, [authCtx])

    return (
        <div className={header.headerContainer}>
            <div className={header.submenuContainer}>
                <div className={header.Left}>
                    <div className={header.logo}>
                        <img src={Logo} alt="image" onClick={() => navigate('/')} />
                    </div>
                    <div className={header.MenuContainer}>
                        <ul>
                            <NavItem title="Home" value='' />
                            <NavItem title="Popular" value='popular' />
                            {authCtx.isLoggedin ?
                                <>
                                    <NavItem title="Watchlist" value='watchlist' />
                                    <NavItem title="Watched" value='watched' />
                                </>
                                : null}
                            <NavItem title="Genre" value='Genre' />
                        </ul>

                    </div>
                </div>

                <div className={header.Middle}>
                    <Search />
                </div>
                <div className={header.ProfileDetails}>
                    {authCtx.isLoggedin ? <button onClick={() => navigate('/logout')}>Logout</button> : <button onClick={() => props.openPopup(true)}>SignIn</button>}
                    <MenuIcon className={header.Menuicon} />
                </div>
            </div>
            <DialogComp open={props.signinPopup} handleClose={() => props.openPopup(false)}>
                <Login />
            </DialogComp>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedin,
        signinPopup: state.user.signinPopup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openPopup: (type) => dispatch(setSigninPopup(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
