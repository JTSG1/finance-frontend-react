import Card from 'react-bootstrap/Card';
import { CardText, CardHeader, CardBody } from 'react-bootstrap';
import './SummaryCard.css';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';


const SummaryCard = ({ summaryData }) => {

    const userDetails = useContext(UserContext);

    console.log("summary", userDetails);

    return (
        <Card>
          <CardHeader>
            Summary
          </CardHeader>
          <CardBody>
            <CardText>
              {
                summaryData.map((summary, index) => (
                  <div key={"sum_" + index}>
                    <span>{ summary.key }</span>
                    <span className='float-end'>£ { summary.value }</span>
                  </div>
                ))
              }
              <hr />
              {
                Object.entries(userDetails.configs).map(([key, value], index) => {
                  return (
                    <div key={"config_" + key}>
                      <span>{ key }</span>
                      <span className='float-end'>{ value }</span>
                    </div>
                  )
                })
              }
            </CardText>
          </CardBody>
        </Card>
    )

}

export default SummaryCard;
