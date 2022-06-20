import header from './header.module.css';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './search/search';
import Logo from '../../assets/images/movieflix.png';
import NavItem from './navItem/navItem';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthContext from '../../context/auth';

const Header = (props) => {
    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);
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
                            <NavItem title="Watchlist" value='watchlist' />
                            <NavItem title="Watched" value='watched' />
                            <NavItem title="Genre" value='Genre' />
                        </ul>

                    </div>
                </div>

                <div className={header.Middle}>
                    <Search />
                </div>
                <div className={header.ProfileDetails}>
                    {authCtx.isLoggedin ? <button onClick={() => navigate('/logout')}>Logout</button> : <button onClick={() => navigate('/login')}>SignIn</button>}
                    <MenuIcon className={header.Menuicon} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedin
    }
}

export default connect(mapStateToProps)(Header);
