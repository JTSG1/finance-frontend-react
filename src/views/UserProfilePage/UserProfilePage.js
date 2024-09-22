import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import './UserProfilePage.css';
import { useEffect, useState } from 'react';
import { getLoggedInUserDetails, getUsersProviders } from '../../api/user_api'

const UserProfilePage = () => {

    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [registeredProviders, setRegisteredProviders] = useState([]);
    const [availableProviders, setAvailableProviders] = useState([]);

    const getProviders = async (withCredentials = true) => {
        try {
            if (withCredentials) {
                const response = await getUsersProviders(true);
                setRegisteredProviders(response);
            } else {
                const response = await getUsersProviders(false);
                setAvailableProviders(response);
            }
        } catch (error) {
            console.error('Failed to get user providers:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchedUserDetails = async () => {
            try{
              const fetchedDetails = await getLoggedInUserDetails();
                setUserDetails(fetchedDetails);
                getProviders(true);
                getProviders(false);
                setLoading(false);
              } 
            catch (error){
                console.error('Failed to get logged in user details:', error);
                throw error;
            }
          };
          fetchedUserDetails();  
    }, []);

    return (
        <Row>
            <Container fluid>
                {
                    loading ? (
                        <div className={'spinner-div'}><span class="loader"></span></div>
                    ) : (
                        <div>
                            <div className="avatar-placeholder">
                                {/* Placeholder for user avatar */}
                            </div>
                            <h1>{ userDetails.username } settings</h1>
                            <p>Here you can set various user settings including adding more providers to enhance your financial view</p>
                            <div className='profileRows'>
                                <div><span>Name: </span><span>{ userDetails.first_name } { userDetails.last_name }</span></div>
                                <div><span>Email: </span><span>{ userDetails.email }</span></div>
                                <div>
                                    <span>Registered Providers</span>
                                    <div className='provider-list'>
                                        {
                                            registeredProviders.map(provider => (
                                                <div>
                                                    <div><img src={provider.logo_url} className='provider-logo'></img></div>
                                                    <div>{ provider.name }</div>
                                                    <div>Credentials expire: { provider.credentials.credentials_expiry }</div>
                                                    <div>[Remove]</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <span>Available Providers</span>
                                    <div className='provider-list'>
                                        {
                                            availableProviders.map(provider => (
                                                <div>
                                                    <div><img src={provider.logo_url} className='provider-logo'></img></div>
                                                    <div>{ provider.name }</div>
                                                    <div>[Add]</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div><span>[Add new provider]</span></div>
                                <div>
                                    <span>Manual Accounts</span>
                                    <div className='provider-list'>
                                        <div>
                                            <div>Account 1</div>
                                            <div>Remove</div>
                                        </div>
                                        <div>
                                            <div>Account 2</div>
                                            <div>Remove</div>
                                        </div>
                                        <div>
                                            <div>Account 3</div>
                                            <div>Remove</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </Container>
        </Row>
    )

}

export default UserProfilePage;
