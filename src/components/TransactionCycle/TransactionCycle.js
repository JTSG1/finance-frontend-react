import Transaction from '../Transaction/Transaction';
import { useState, useEffect } from 'react';


const TransactionCycle = ({cycleName, transactionCycle, index}) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    console.log(transactionCycle);

    const isNotCollapsed = () => { 
        setIsCollapsed(!isCollapsed);
    }

    const getCredits = () => {
        let sum = 0;
        sum = transactionCycle.reduce(
            (sum, transaction) => {
                let amount = parseFloat(transaction.amount);
                return amount > 0 ? sum + amount : sum;
            }, 0
            ).toFixed(2)
        return sum;
    }

    const getDebits = () => {
        let sum = 0;
        sum = transactionCycle.reduce(
            (sum, transaction) => {
                let amount = parseFloat(transaction.amount);
                return amount < 0 ? sum + amount : sum;
            }, 0
            ).toFixed(2)
        return sum;
    }

    useEffect(() => {
        if(index === 0){
            setIsCollapsed(false);
        }
    }, [])

    return (
        <div>
            <div className={ 'cycle-container ' + (isCollapsed ? "collapsed" : " ")} onClick={isNotCollapsed}>
                <div className='cycle-header'>
                    <span>
                        { cycleName } 
                    </span>
                    <span style={{ "float" : "right" }}>
                        <b>Count:</b> { transactionCycle.length } <b>Credits:</b> { getCredits() } <b>Debits:</b> { getDebits() }
                    </span>
                </div>
                <div className='container cycle-body'>{
                    transactionCycle.map((transaction, index) => {
                        return (
                            <Transaction transaction={transaction}/>
                        )
                    })
                }</div>
                <div className='cycle-footer'>
                    {/* to be utilised */}
                </div>
            </div>
        </div>
    )
}

export default TransactionCycle;
