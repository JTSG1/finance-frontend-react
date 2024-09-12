import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import './UserProfilePage.css';
import { useEffect, useState } from 'react';
import getLoggedInUserDetails from '../../api/user_api'

const UserProfilePage = () => {

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
                                <div><span>Email: </span><span>{ userDetails.email }</span></div>
                                <div>
                                    <span>Registered Providers</span>
                                    <div className='provider-list'>
                                        <div>
                                            <div>Provider 1</div>
                                            <div>Remove</div>
                                        </div>
                                        <div>
                                            <div>Provider 2</div>
                                            <div>Remove</div>
                                        </div>
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
