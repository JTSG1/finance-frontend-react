import { Nav, Container, Row, Col } from 'react-bootstrap';
import AccountCard from '../../components/AccountCard/AccountCard';
import accountData from '../../data/accounts.json';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import { Link } from 'react-router-dom';

const HomePage = ({}) => {

    return (
        <Row>
            <Col sm={7}>
                {
                accountData.map((account, index) => (
                    <Link to={'/' + index} style={{ textDecoration: 'none' }}>
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
                <SummaryCard /> 
            </Col>
        </Row>
    )

}

export default HomePage;
