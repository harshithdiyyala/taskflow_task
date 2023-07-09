import {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../TopBar'
import DebitCredit from '../DebitCredit'
import './index.css'
import RecentTransactions from '../RecentTransactions'
import TransactionsChart from '../TransactionChart'

class Dashboard extends Component {
    render(){
        return(<div className='dashboard-page'>
            <SideBar name = 'Accounts'/>
            <div className='dashboard-container'>
                    <TopBar name = 'Accounts'/>
                    <div className='debit-credit-container'>
                        <DebitCredit/>
                    </div>
                    <RecentTransactions/>
                    
                    <TransactionsChart/>
            </div>
        </div>)
    }
}

export default Dashboard;