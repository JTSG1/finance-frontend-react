import { Link } from 'react-router-dom';
import { getLoggedInUserDetails } from '../../api/user_api'
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserContext';
import './NavBar.css';

const NavBar = ({ appName }) => {

    const userDetails = useContext(UserContext);

    useEffect(() => {
                     
    }, []);

    return (
        <nav className="p-3 mb-4 navbar finbal-theme">
          {/* <Link to="/" className="nav-link">{ appName }</Link> */}
          <span></span>
          <Link to="/userProfile" className="nav-link ml-auto">
            <FontAwesomeIcon icon={faUser} className='userIcon'/>
            { userDetails.username } ({ userDetails.email })
          </Link>
        </nav>
        
    )

}

export default NavBar;
