import {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../TopBar'
import DebitCredit from '../DebitCredit'
import './index.css'
import RecentTransactions from '../RecentTransactions'

class Dashboard extends Component {
    render(){
        return(<div className='dashboard-page'>
            <div><SideBar/></div>
            <div className='dashboard-container'>
                    <TopBar name = 'Accounts'/>
                    <div className='debit-credit-container'>
                        <DebitCredit/>
                    </div>
                    <RecentTransactions/>
            </div>
        </div>)
    }
}

export default Dashboard;