import { Link } from 'react-router-dom';
import getLoggedInUserDetails from '../../api/user_api'
import { useEffect, useState } from 'react';

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
    });

    return (
        <nav className="p-3 navbar">
          <Link to="/" className="nav-link">{ appName }</Link>
          <Link className="nav-link ml-auto">{ userDetails.username } ({ userDetails.email })</Link>
        </nav>
        
    )

}

export default NavBar;
