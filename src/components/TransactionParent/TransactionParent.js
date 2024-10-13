import { Link } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import { Card, CardFooter, CardText, CardHeader, CardBody } from 'react-bootstrap';
import { getAccountTransactions } from '../../api/account_api';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import TransactionCycle from '../TransactionCycle/TransactionCycle';
import './TransactionParent.css'

const TransactionParent = ({ account }) => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transactionCycles, setTransactionCycles] = useState({})

    const userDetails = useContext(UserContext);

    useEffect(() => {
        const fetchedAccounts = async () => {
          try{
            const fetchedDetails = await getAccountTransactions(account.id);
              setTransactions(fetchedDetails);
              setLoading(false);
            } 
          catch (err){
            //handle failures
            console.error(err);
          }
        };
        fetchedAccounts();
    }, []);

    useEffect(() => {
        if (transactions.length > 0) { 
            getPayCycle();
          }
    }, [transactions])

    const getPayCycle = () => {

        /*
            Funcation requires more work to account for shorter months and also maybe to account for weekends too
        */

        let payDay = userDetails.configs.PAY_DAY;
        let cycles = {

        }

        transactions.map((transaction) => {

            let date = new Date(transaction.timestamp);
            let transactionDay = date.getDate();
            let transactionMonth = date.getMonth();
            let transactionYear = date.getFullYear();

            let cycleStart;
            let cycleEnd;

            let payDay = userDetails.configs.PAY_DAY;

            if(transactionDay >= (payDay)){ 
                cycleStart = formatCycleDate(new Date(transactionYear, transactionMonth, payDay));
                cycleEnd = formatCycleDate(new Date(transactionYear, transactionMonth + 1, payDay - 1));

                let cycleKey = cycleStart + "-" + cycleEnd;
                if(cycles[cycleKey] === undefined){
                    cycles[cycleKey] = [transaction];
                } else {
                    cycles[cycleKey].push(transaction)
                }

            } else {
                cycleStart = formatCycleDate(new Date(transactionYear, transactionMonth -1, payDay));
                cycleEnd = formatCycleDate(new Date(transactionYear, transactionMonth, payDay - 1));

                let cycleKey = cycleStart + "-" + cycleEnd;
                if(cycles[cycleKey] === undefined){
                    cycles[cycleKey] = [transaction];
                } else {
                    cycles[cycleKey].push(transaction)
                }

            }

        });

        setTransactionCycles(cycles);

    }

    const formatCycleDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    return (
        <Card className="mt-2">
        <CardHeader>
            Transactions
        </CardHeader>
        <CardBody>
          <CardText>
            <div>
                {
                    loading ? <div className={'spinner-div'}><span class="loader"></span></div> : (
                        Object.entries(transactionCycles).map(([key, value], index) => {
                            return (
                                <TransactionCycle cycleName={key} transactionCycle={value} index={index} count={transactionCycles.length}/>
                            )
                        })
                    )
                }
            </div>
          </CardText>
        </CardBody>
        <CardFooter />
      </Card>
    )

}

export default TransactionParent;
