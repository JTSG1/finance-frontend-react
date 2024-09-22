import { Link } from 'react-router-dom';
import { getLoggedInUserDetails } from '../../api/user_api'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = ({ appName }) => {

    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedUserDetails = async () => {
          try{
            const fetchedDetails = await getLoggedInUserDetails();
              setUserDetails(fetchedDetails);
              setLoading(false);
            } 
          catch (err){
            //handle failures
          }
        };
        fetchedUserDetails();                       
    }, []);

    return (
        <nav className="p-3 navbar">
          <Link to="/" className="nav-link">{ appName }</Link>
          <Link to="/userProfile" className="nav-link ml-auto">
            <FontAwesomeIcon icon={faUser} className='userIcon'/>
            { userDetails.username } ({ userDetails.email })
          </Link>
        </nav>
        
    )

}

export default NavBar;
