import Card from 'react-bootstrap/Card';
import { CardText, CardHeader, CardBody } from 'react-bootstrap';
import './SummaryCard.css';

const SummaryCard = ({}) => {

    return (
        <Card>
          <CardHeader>
            Summary
          </CardHeader>
          <CardBody>
            <CardText>
              <div>
                <span>Net Worth: </span>
                <span className='float-end'>£ 1000</span>
              </div>
              <div>
                <span>30 day benchmark: </span>
                <span className='float-end'> Up £1000</span>
              </div>
              <div>
                <span>Recent Transactions: </span>
                <span className='float-end'>5</span>
              </div>
              <div>
                <span>Total Assets: </span>
                <span className='float-end'>£ 15000</span>
              </div>
              <div>
                <span>Savings Goal: </span>
                <span className='float-end'>£ 2000 / £ 5000</span>
              </div>
              <div>
                <span>Upcoming Bills: </span>
                <span className='float-end'>£ 200</span>
              </div>
              <div>
                <span>Monthly Income: </span>
                <span className='float-end'>£ 4000</span>
              </div>
              <div>
                <span>Monthly Expenses: </span>
                <span className='float-end'>£ 3000</span>
              </div>
            </CardText>
          </CardBody>
        </Card>
    )

}

export default SummaryCard;
