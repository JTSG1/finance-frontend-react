import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AccountCard from '../../components/AccountCard/AccountCard';
import TransactionParent from '../../components/TransactionParent/TransactionParent';
import { getUsersAccounts } from '../../api/account_api';
import { useEffect, useState } from 'react';

const AccountDrilldown = () => {

    const { accountIndex } = useParams();

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
        <Row>
            <Container fluid>
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            <Row>
                                <Col sm={7}>
                                    <AccountCard account={ accounts[accountIndex] } cardIndex={accountIndex}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={7}>    
                                    <TransactionParent account={ accounts[accountIndex] } />
                                </Col>
                            </Row>
                        </div>
                    )
                }
                {/* <Row>
                    <Col sm={7}>
                        <AccountCard account={ accounts[accountIndex] } cardIndex={accountIndex}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>    
                        <TransactionParent />
                    </Col>
                </Row> */}
            </Container>
        </Row>
    )

}

export default AccountDrilldown;
