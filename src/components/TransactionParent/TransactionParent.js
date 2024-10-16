import { Link } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import { Card, CardFooter, CardText, CardHeader, CardBody } from 'react-bootstrap';
import { getAccountTransactions } from '../../api/account_api';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import TransactionCycle from '../TransactionCycle/TransactionCycle';
import './TransactionParent.css'

const TransactionParent = ({ transactions }) => {

    //const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transactionCycles, setTransactionCycles] = useState({})

    const userDetails = useContext(UserContext);

    useEffect(() => {
        if (transactions.length > 0) { 
            getPayCycle();
          }
        if(transactions){
            setLoading(false);
        }
    }, [transactions])

    const getPayCycle = () => {
        /*
            This function calculates pay cycles by adjusting the pay date for weekends
            and handles shorter months, ensuring accurate cycle ranges.
        */
    
        let payDay = userDetails.configs.PAY_DAY;
        let cycles = {}
    
        transactions.map((transaction) => {
            let date = new Date(transaction.timestamp);
            let transactionDay = date.getDate();
            let transactionMonth = date.getMonth();
            let transactionYear = date.getFullYear();
    
            let cycleStart;
            let cycleEnd;
    
            // Calculate adjusted payday for the current month
            let adjustedPayDay = calculateAdjustedPayDay(payDay, transactionYear, transactionMonth);
    
            // we see if the transaction day is within the adjustedPayDay cycle or the one before
            if (transactionDay >= adjustedPayDay) { 
                // Cycle starts this month, ends next month
                cycleStart = formatCycleDate(new Date(transactionYear, transactionMonth, adjustedPayDay));
                let nextMonth = transactionMonth + 1;
                let cycleEndDay = calculateAdjustedPayDay(payDay, transactionYear, nextMonth);
                cycleEnd = formatCycleDate(new Date(transactionYear, nextMonth, cycleEndDay - 1));
    
                let cycleKey = cycleStart + " - " + cycleEnd;
                if (cycles[cycleKey] === undefined) {
                    cycles[cycleKey] = [transaction];
                } else {
                    cycles[cycleKey].push(transaction);
                }
            } else {
                // Cycle starts last month, ends this month
                let previousMonth = transactionMonth - 1;
                if (previousMonth < 0) {
                    previousMonth = 11; // Handle December as the previous month of January
                    transactionYear -= 1;
                }
                cycleStart = formatCycleDate(new Date(transactionYear, previousMonth, calculateAdjustedPayDay(payDay, transactionYear, previousMonth)));
                cycleEnd = formatCycleDate(new Date(transactionYear, transactionMonth, adjustedPayDay - 1));
    
                let cycleKey = cycleStart + " - " + cycleEnd;
                if (cycles[cycleKey] === undefined) {
                    cycles[cycleKey] = [transaction];
                } else {
                    cycles[cycleKey].push(transaction);
                }
            }
        });
    
        setTransactionCycles(cycles);
    }
    
    // Helper function to adjust the payday if it falls on a weekend
    const calculateAdjustedPayDay = (payDay, year, month) => {
        let daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the month
        let adjustedPayDay = Math.min(payDay, daysInMonth); // Ensure payDay isn't beyond month's days
        let payDate = new Date(year, month, adjustedPayDay);
    
        // Adjust for weekends (move backward if Saturday/Sunday)
        if (payDate.getDay() === 0) { // Sunday
            adjustedPayDay -= 2;
        } else if (payDate.getDay() === 6) { // Saturday
            adjustedPayDay -= 1;
        }
    
        return adjustedPayDay;
    }
    
    // Example date formatting function
    const formatCycleDate = (date) => {
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
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
                                <TransactionCycle cycleName={key} transactionCycle={value} index={index}/>
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
