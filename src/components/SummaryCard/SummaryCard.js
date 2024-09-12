import Card from 'react-bootstrap/Card';
import { CardText, CardHeader, CardBody } from 'react-bootstrap';
import './SummaryCard.css';

const SummaryCard = ({ summaryData }) => {

    return (
        <Card>
          <CardHeader>
            Summary
          </CardHeader>
          <CardBody>
            <CardText>
              {
                summaryData.map((summary, index) => (
                  <div>
                    <span>{ summary.key }</span>
                    <span className='float-end'>£ { summary.value }</span>
                  </div>
                ))
              }
            </CardText>
          </CardBody>
        </Card>
    )

}

export default SummaryCard;
