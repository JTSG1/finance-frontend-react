import Card from 'react-bootstrap/Card';
import { CardText, CardHeader, CardBody } from 'react-bootstrap';
import './SummaryCard.css';
import { useContext } from 'react';


const SummaryCard = ({ title, children }) => {

    return (
        <Card className='mt-2'>
          <CardHeader>
            { title }
          </CardHeader>
          <CardBody>
            <CardText>
             <div>{ children }</div>
            </CardText>
          </CardBody>
        </Card>
    )

}

export default SummaryCard;
