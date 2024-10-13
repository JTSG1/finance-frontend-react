import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { CardTitle, CardHeader, CardBody } from 'react-bootstrap';
import { CardText, Container, Col, Row, CardFooter, Badge } from 'react-bootstrap';
import './AccountCard.css';
import PieChart from '../BalanceChart/BalanceChart';
import numberSequence from '../../data/transaction-sample.json';
import { getAccountBalances } from '../../api/account_api';
import './Spinner.css';

const AccountCard = ({ account, cardIndex, isIterate }) => {

    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartLoading, setChartLoading] = useState(true);

    const [chartData, setChartData] = useState();

    useEffect(() => {
      const fetchedBalances = async () => {
        try{
          const balances = await getAccountBalances(account.id);

            setBalances(balances);
            setLoading(false);

            setChartData({
              labels : balances.map((balance) => balance.available),
              datasets : [
                {
                  label: "Balance",
                  data: balances.map((balance) => balance.available),
                  borderWidth: 2,
                  tension: 0.3
                },
              ],
            });

            setChartLoading(false);
          } 
        catch (err){
          //handle failures
        }
      };
      fetchedBalances();
    }, []);

    return (
        <Card className={`${ cardIndex > 0 && isIterate ? "mt-2" : "" } ${ account.is_manual_account ? "manual-account" : "auto-account" }`}>
          <CardHeader className={".card-bg-primary-finbal"}>
            { account.display_name } 
            <span style={ { float: 'right'} }>
              ({ account.number } { account.sort_code })
            </span>
          </CardHeader>
          <CardBody>
            <CardText>
              <Container fluid>
                <Row style={ { "height" : "200px" } }>
                  <Col sm={2} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%' // Ensure the Col takes up the full height of its container
                    }}>
                    <img src={ account.provider.logo_url } alt={ account.display_name } style={ { height : '75px', maxWidth : '100%'} } />
                  </Col>
                  <Col sm={10} >
                    {/* <img src={ account.sample_graph } alt={ account.display_name } style={ { width : '100%'} } /> */}
                    {
                      chartLoading ? (
                        <div className={'spinner-div'}><span class="loader"></span></div>
                      ) : (
                        <div>
                          {
                            <PieChart chartData={ chartData } />
                          }
                        </div>
                      )
                    }
                  </Col>
                </Row>
                <Row>

                </Row>
              </Container>
            </CardText>
          </CardBody>
          <CardFooter>
              <Row>
              <Col sm={8}>
                {/* <span>Transactions <Badge>100</Badge></span>
                <span className='px-4'>Direct Debits <Badge>2</Badge></span> */}
                {/* <span className='px-4'>Analytics <Badge>NEW!</Badge></span> */}
              </Col>
              <Col sm={4} className={ ["text-end"] }>
                <span className={`${account.latest_balance.available < 0 ? 'negative-value' : ''}`}>{ account.latest_balance.currency } { account.latest_balance.available }</span>
              </Col>
              </Row>
            </CardFooter>
        </Card>
    )

}

export default AccountCard;
