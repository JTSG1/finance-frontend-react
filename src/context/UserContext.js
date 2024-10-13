import React, { createContext, useState, useEffect } from 'react';
import { getLoggedInUserDetails } from '../api/user_api';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
        try{
            const fetchedDetails = await getLoggedInUserDetails();
                setUserDetails(fetchedDetails);
            } 
        catch (error){
            console.error('Error fetching config:', error);
        }
    };

    fetchConfig();
  }, []);

  return (
    <UserContext.Provider value={userDetails}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };