import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AccountCard from '../../components/AccountCard/AccountCard';
import TransactionParent from '../../components/TransactionParent/TransactionParent';
import { getUsersAccounts } from '../../api/account_api';
import { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard/SummaryCard'
import PieChart from '../../components/Charts/DoughnutChart'

const AccountDrilldown = () => {

    const { accountIndex } = useParams();

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [chartData, setChartData] = useState();

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
        setChartData({
            labels : ["a","b", "c", "d"],
            datasets : [
              {
                label: "Balance",
                data: [1,2,4,4],
              },
            ],
          });
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
                                <Col sm={12}>
                                    <AccountCard account={ accounts[accountIndex] } cardIndex={accountIndex}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={7}>    
                                    <TransactionParent account={ accounts[accountIndex] } />
                                </Col>
                                <Col sm={5}>
                                    <SummaryCard title="Analysis">
                                        <div style={ { "width":"40%", "margin":"auto", "textAlign":"center" } }>
                                            <div>Share of spending</div>
                                            <PieChart chartData={ chartData }/>
                                        </div>
                                    </SummaryCard>
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
