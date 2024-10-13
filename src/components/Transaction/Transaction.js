import { Link } from 'react-router-dom';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import "./Transaction.css"

const Transaction = ({ transaction }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const formatClassification = (classification) => {

        return (
            <div>
                {
                    classification.map((item, index) => {
                        return (
                        <span class='transaction-classification-badge'>
                            { item }
                        </span>
                        )
                    })
                }
            </div>
        )

    }
      

    return (
        <Row className={ "transaction_row" }>
            <Col sm={2}>
                { formatDate(transaction.timestamp) }
            </Col>
            <Col sm={4}>
                { transaction.description }
            </Col>
            <Col sm={4}>
                { formatClassification(transaction.transaction_classification) }
            </Col>
            <Col sm={2} className={ ["text-end"] }>
                { transaction.amount < 0 ? <span className="text-danger">{ transaction.amount }</span> : transaction.amount }
            </Col>
        </Row>
    )

}

export default Transaction;
