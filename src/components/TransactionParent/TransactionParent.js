import { Link } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import { Card, CardFooter, CardText, CardHeader, CardBody } from 'react-bootstrap';

const TransactionParent = ({ accountName }) => {

    const transactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    return (
        <Card className="mt-2">
        <CardHeader>
            Transactions
        </CardHeader>
        <CardBody>
          <CardText>
            <div>
                {
                    transactions.map((transaction, index) => {
                        return (
                            <div key={index}>
                                <Transaction transaction={index}/>
                            </div>
                        )
                    })
                }
            </div>
          </CardText>
        </CardBody>
        <CardFooter />
      </Card>
    )

}

export default TransactionParent;
