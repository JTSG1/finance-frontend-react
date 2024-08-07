import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { CardTitle, CardHeader, CardBody } from 'react-bootstrap';
import { CardText, Container, Col, Row, CardFooter, Badge } from 'react-bootstrap';
import './AccountCard.css';
import PieChart from '../LineChart/LineChart';
import numberSequence from '../../data/transaction-sample.json';

const AccountCard = ({ account, cardIndex, isIterate }) => {

    const [chartData, setChartData] = useState({
      labels : numberSequence[cardIndex],
      datasets : [
        {
          label: "Balance",
          data: numberSequence[cardIndex],
          borderWidth: 5,
          tension: 0.3
        },
      ],
    });

    return (
        <Card className={`${ cardIndex > 0 && isIterate ? "mt-2" : "" } ${ account.type == "MANUAL" ? "manual-account" : "auto-account" }`}>
          <CardHeader>
            { account.display_name } 
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
                    <img src={ account.logo_src } alt={ account.display_name } style={ { height : '75px', maxWidth : '100%'} } />
                  </Col>
                  <Col sm={10} >
                    {/* <img src={ account.sample_graph } alt={ account.display_name } style={ { width : '100%'} } /> */}
                    <PieChart chartData={ chartData } />
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
                <span>Transactions <Badge>100</Badge></span>
                <span className='px-4'>Direct Debits <Badge>2</Badge></span>
                <span className='px-4'>Analytics <Badge>NEW!</Badge></span>
              </Col>
              <Col sm={4} className={ ["text-end"] }>
                <span className={`${account.balance < 0 ? 'negative-value' : ''}`}>{ account.currency } { account.balance }</span>
              </Col>
              </Row>
            </CardFooter>
        </Card>
    )

}

export default AccountCard;
