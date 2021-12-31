import header from './header.module.css';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './search/search';
import Logo from '../../assets/images/movieflix.png';
import NavItem from './navItem/navItem';
import Backdrop from '../Backdrop/Backdrop';

const Header = () => {
    return (
        <div className={header.headerContainer}>
            <div className={header.submenuContainer}>
                <div className={header.Left}>
                    <div className={header.logo}>
                        <img src={Logo}/>
                    </div>
                    <div className={header.MenuContainer}>
                            <ul>
                                <NavItem title="Home" value=''/>
                                <NavItem title="New" value='new'/>
                                <NavItem title="Popular" value='popular'/>
                                <NavItem title="Watchlist" value='watchlist'/>
                                <NavItem title="Genre" value='Genre'/>
                            </ul>
                            
                    </div>
                </div>
                
                <div className={header.Middle}>
                    <Search/>
                </div>
                <div className={header.ProfileDetails}>
                    <button>SignIn</button>
                    <MenuIcon className={header.Menuicon}/>
                </div>
            </div>
        </div>
    )
}

export default Header
