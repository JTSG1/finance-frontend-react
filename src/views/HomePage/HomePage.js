import { Nav, Container, Row, Col } from 'react-bootstrap';
import AccountCard from '../../components/AccountCard/AccountCard';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import { Link } from 'react-router-dom';
import sampleSummaryData from '../../data/sampleSummaryData.json';
import { getUsersAccounts } from '../../api/account_api';
import { useEffect, useState } from 'react';

const HomePage = ({}) => {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedAccounts = async () => {
          try{
            const fetchedDetails = await getUsersAccounts();
              setAccounts(fetchedDetails);
              setLoading(false);
            } 
          catch (err){
            //handle failures
          }
        };
        fetchedAccounts();
    }, []);

    return (
            <div>
                {
                    loading ? (
                        <div>Loading... [Create Carc Component]</div>
                    ) : (
                        <Row>
                            <Col sm={7}>
                                {
                                accounts.map((account, index) => (
                                    <Link to={'/account/' + index} style={{ textDecoration: 'none' }}>
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
                                <SummaryCard summaryData={sampleSummaryData}/> 
                            </Col>
                        </Row>
                    )
                }
            </div>
    )

}

export default HomePage;
