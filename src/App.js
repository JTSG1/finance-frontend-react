import React, { useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import HomePage from './views/HomePage/HomePage';
import AccountDrilldown from './views/AccountDrilldown/AccountDrilldown';
import LoginPage from './views/LoginPage/LoginPage';
import accountData from './data/accounts.json';
import AccountCard from './components/AccountCard/AccountCard';
import LeftColNav from './components/LeftColNav/LeftColNav';

// function AccountRoute() {
//   const { accountIndex } = useParams(); // Extract accountIndex from the URL
//   const index = parseInt(accountIndex, 10); // Convert the string to a number

//   // Ensure index is within the bounds of accountData array
//   const account = accountData[index] || {}; // Fallback to empty object if index is out of bounds

//   return <AccountCard account={account} />;
// }

function App() {

  let appName = "Super-Finance-App";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (

    <Router>
        <Container fluid>
          <div className="App">
            {isLoggedIn ? (
                <div>
                <header style={ { height: '80px' } }>
                  <NavBar appName={ appName }/>
                </header>
                <Row>
                    <Col sm={1}>
                        <LeftColNav />
                    </Col>
                    <Col sm={11}>
                        <Routes>
                          <Route path="/" element={ 
                            <HomePage />
                          }/>
                          <Route path="/:accountIndex" element={ 
                            <AccountDrilldown />
                          }/>
                        </Routes>
                    </Col>
                </Row>
                </div>
            ) : (
                <LoginPage onLogin={handleLogin}/>
            )}
          </div>
        </Container>

    </Router>
  );
}

export default App;
