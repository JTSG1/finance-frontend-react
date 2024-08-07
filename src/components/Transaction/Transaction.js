import { Link } from 'react-router-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import "./Transaction.css"

const Transaction = ({ transaction }) => {

    return (
        <Row className={ "transaction_row" }>
            <Col sm={2}>
                01/01/2021
            </Col>
            <Col sm={8}>
                TRANSACTION { transaction }
            </Col>
            <Col sm={2} className={ ["text-end"] }>
                £{transaction * 100}
            </Col>
        </Row>
    )

}

export default Transaction;
