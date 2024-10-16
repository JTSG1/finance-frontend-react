import { Nav, Container, Row, Col, AccordionCollapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AccountCard from '../../components/AccountCard/AccountCard';
import TransactionParent from '../../components/TransactionParent/TransactionParent';
import { getUsersAccounts, getAccountTransactions } from '../../api/account_api';
import { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard/SummaryCard'
import PieChart from '../../components/Charts/DoughnutChart'

const AccountDrilldown = () => {

    const { accountId } = useParams();

    const [account, setAccount] = useState([]);
    const [accountIsCredit, setAccountIsCredit] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);

    const [chartData, setChartData] = useState();

    useEffect(() => {

        const fetchedAccounts = async () => {
            try {
                const fetchedDetails = await getUsersAccounts(accountId);
                setAccount(fetchedDetails);
                setLoading(false);
            }
            catch (err) {
                //handle failures
            }
        };
        fetchedAccounts();
    }, []);

    useEffect(() => {

        account.type === "CREDIT" ? setAccountIsCredit(true) : setAccountIsCredit(false);

        const fetchTransactions = async () => {
            try {
                const fetchedDetails = await getAccountTransactions(account.id);
                setTransactions(fetchedDetails);
                //setLoading(false);
            }
            catch (err) {
                //handle failures
                console.error(err);
            }
        };
        fetchTransactions();

    }, [account])

    useEffect(() => {
        const summariseSpendingForChart = () => {

            let summarised = {};

            const countTransactionClassification = (classification, amount) => {
                if (summarised[classification] === undefined) {
                    summarised[classification] = parseFloat(amount);
                } else {
                    summarised[classification] += parseFloat(amount);
                }
            }

            const amountIsCreditOrDebit = (amount) => {
                if(accountIsCredit){
                    return amount > 0;
                } else {
                    return amount < 0;
                }
            }

            transactions.map((transaction) => {
                if(amountIsCreditOrDebit(transaction.amount)){
                    if(transaction.transaction_classification.length === 0){
                        countTransactionClassification("Other", transaction.amount );
                    } else {
                        if(transaction.transaction_classification.length === 1){
                            countTransactionClassification(transaction.transaction_classification[0], transaction.amount );
                        } else {
                            countTransactionClassification(transaction.transaction_classification[1], transaction.amount );
                        }
                    }
                }
            })

            console.log("summarised", summarised);

            const generateRandomColor = () => {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            const backgroundColors = Object.keys(summarised).map(() => generateRandomColor());

            setChartData({
                labels: Object.keys(summarised),
                datasets: [
                    {
                        label: "Balance",
                        data: Object.values(summarised),
                        backgroundColor: backgroundColors,
                    }
                ],
            
            });
            setLoadingChart(false);
        }
        summariseSpendingForChart();
    }, [transactions])

    
    return (
        <Row>
            <Container fluid>
                {
                    loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            <Row>
                                <Col sm={12}>
                                    <AccountCard account={account} cardIndex="0" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={7}>
                                    <TransactionParent transactions={transactions} />
                                </Col>
                                <Col sm={5}>
                                    <SummaryCard title="Analysis">
                                        <div style={{ "width": "100%", "margin": "auto", "textAlign": "center" }}>
                                            <div>Transaction Count by Category</div>
                                            {
                                                loadingChart ? (
                                                    <div>Loading...</div>
                                                ) : (
                                                    <PieChart chartData={chartData} />
                                                )
                                            }
                                        </div>
                                    </SummaryCard>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </Container>
        </Row>
    )

}

export default AccountDrilldown;
