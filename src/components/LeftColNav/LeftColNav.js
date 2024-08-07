import Card from 'react-bootstrap/Card';
import { CardTitle, CardHeader, CardBody } from 'react-bootstrap';
import { CardText, Container, Col, Row, CardFooter } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './LeftColNav.css';

const LeftColNav = ({}) => {

    return (
        <div className='navLeft'>
          <ul>
            <li>Home</li>
            <li>Transactions</li>
            <li>Direct Debits</li>
            <li>Standing Orders</li>
            <li>Analytics</li>
          </ul>
        </div>
    )

}

export default LeftColNav;
