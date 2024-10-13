import Transaction from '../Transaction/Transaction';
import { useState, useEffect } from 'react';


const TransactionCycle = ({cycleName, transactionCycle, index, count}) => {

    console.log(transactionCycle);

    const [isCollapsed, setIsCollapsed] = useState(true);

    const isNotCollapsed = () => { 
        setIsCollapsed(!isCollapsed);
    }

    useEffect(() => {
        console.log(count);
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
                        Count: { transactionCycle.length }
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