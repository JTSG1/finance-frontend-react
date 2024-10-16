import { Nav, Container, Row, Col } from 'react-bootstrap';
import AccountCard from '../../components/AccountCard/AccountCard';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import { Link } from 'react-router-dom';
import { getUsersAccounts } from '../../api/account_api';
import { useEffect, useState , useContext} from 'react';
import { UserContext } from '../../context/UserContext';

const HomePage = ({}) => {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userDetails = useContext(UserContext);

    useEffect(() => {
        const fetchedAccounts = async () => {
          try{
            const fetchedDetails = await getUsersAccounts();
              setAccounts(fetchedDetails);
              setLoading(false);
            } 
          catch (err){
            console.error("UNABLE TO GET USER ACCOUNTS", err);
          }
        };
        fetchedAccounts();
    }, []);

    return (
            <div>
                {
                    loading ? (
                        <div className={'spinner-div'}><span class="loader"></span></div>
                    ) : (
                        <Row>
                            <Col sm={7}>
                                {
                                accounts.map((account, index) => (
                                    <Link to={'/account/' + account.id} style={{ textDecoration: 'none' }}>
                                        <Row key={index}>
                                            <Col sm={12}>
                                                <AccountCard account={ account } cardIndex={ index } isIterate={ true    }/>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                                }
                            </Col>
                            <Col >
                                <SummaryCard title={"Summary"}>
                                    {
                                        
                                            Object.entries(userDetails.configs).map(([key, value], index) => {
                                              return (
                                                <div key={"config_" + key}>
                                                  <span>{ key }</span>
                                                  <span className='float-end'>{ value }</span>
                                                </div>
                                              )
                                            })
                                    }
                                </SummaryCard> 
                            </Col>
                        </Row>
                    )
                }
            </div>
    )

}

export default HomePage;
