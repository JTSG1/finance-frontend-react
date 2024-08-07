import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import accountData from '../../data/accounts.json';
import AccountCard from '../../components/AccountCard/AccountCard';
import TransactionParent from '../../components/TransactionParent/TransactionParent';

const AccountDrilldown = () => {

    const { accountIndex } = useParams();

    return (
        <Row>
            <Container fluid>
                <Row>
                    <Col sm={7}>
                        <AccountCard account={ accountData[accountIndex] } cardIndex={accountIndex}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <TransactionParent />
                    </Col>
                </Row>
            </Container>
        </Row>
    )

}

export default AccountDrilldown;
