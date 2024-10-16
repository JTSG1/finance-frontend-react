import React, { useEffect, useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import HomePage from './views/HomePage/HomePage';
import AccountDrilldown from './views/AccountDrilldown/AccountDrilldown';
import UserProfilePage from './views/UserProfilePage/UserProfilePage';
import LoginPage from './views/LoginPage/LoginPage';
import LeftColNav from './components/LeftColNav/LeftColNav';
import { UserContext, UserProvider } from './context/UserContext';

// function AccountRoute() {
//   const { accountIndex } = useParams(); // Extract accountIndex from the URL
//   const index = parseInt(accountIndex, 10); // Convert the string to a number

//   // Ensure index is within the bounds of accountData array
//   const account = accountData[index] || {}; // Fallback to empty object if index is out of bounds

//   return <AccountCard account={account} />;
// }

function App() {

  let appName = "Finbal";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
  });
  // Function to handle login
  const handleLogin = () => {

    if(localStorage.getItem('access') && localStorage.getItem('refresh')){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  };

  return (
    <UserProvider>
      <Router>
            <div className="App">
              {isLoggedIn ? (
                <div>
                <header style={ { height: '80px' } }>
                  <NavBar appName={ appName }/>
                </header>
                  <Routes>
                    <Route path="/" element={ 
                      <Row>
                        <Col sm={1}>
                            <LeftColNav />
                        </Col>
                        <Col sm={11}>
                          <HomePage /> 
                        </Col>
                      </Row>
                    }/>
                    <Route path="/account/:accountId" element={ 
                      <Row>
                        <Col sm={1}>
                            <LeftColNav />
                        </Col>
                        <Col sm={11}>
                        <AccountDrilldown />
                        </Col>
                      </Row>
                    }/>
                    <Route path="/userProfile/" element={ 
                      <Row>
                        <Col sm={12}>
                        <UserProfilePage />
                        </Col>
                      </Row>
                    }/>
                  </Routes>
                </div>
              ) : (
                  <LoginPage onLogin={handleLogin}/>
              )}
            </div>
      </Router>
    </UserProvider>
  );
}

export default App;
