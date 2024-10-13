import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { CardTitle, CardHeader, CardBody } from 'react-bootstrap';
import { CardText, Container, Col, Row, CardFooter } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './LeftColNav.css';

const LeftColNav = ({}) => {

    return (
        <div className='navLeft'>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>
    )

}

export default LeftColNav;
