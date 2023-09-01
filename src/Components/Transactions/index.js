import {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../TopBar'
import Cookies from 'js-cookie'
import {TailSpin }from 'react-loader-spinner'
import SingleTransaction from '../SingleTransaction'
import './index.css'

class Transactions extends Component {

    state = {initialtransactions:[],alltransactions:[],isLoading:true,type:'all',msg:''}

    componentDidMount() {
        this.getAllTransactions();
    }

    getAllTransactions = async() => {
        const token = Cookies.get('token');
        const queryParams = new URLSearchParams();
        queryParams.append('limit','150');
        queryParams.append('offset','0');
        const abc = token === '3' ? 'admin':'user';
            
            const url = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?${queryParams.toString()}`

            const options = {
                method:'GET',
                headers :{
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                    "x-hasura-role":abc,
                    "x-hasura-user-id":token
                }
            }

            const response = await fetch(url,options);
            const data = await response.json();
            const {transactions} = data ;
            
            if(response.ok === true && transactions.length >0){
                this.setState({alltransactions:transactions,initialtransactions:transactions,isLoading:false})
            }
            else {
                this.setState({msg:'No Transactions....',isLoading:false})
            }

    }


    renderLoading = () => {
        return(<div style ={{margin:'auto'}}>
        <TailSpin type="TailSpin" color="#0284c7" height={50} width={50} />
           </div>)
    }

    renderData = () => {
        const {alltransactions} = this.state

        return(<div className='transactions-container'>
        <ul>
            <li className='transaction-header'>
                <h1 className='table-heading'>Transaction Name</h1>
                <h1 className='table-heading'>Category</h1>
                <h1 className='table-heading'>Date</h1>
                <h1 className='table-heading'>Amount</h1>
                <h1 className='table-heading'> </h1>
            </li>
            {alltransactions.map(item => <SingleTransaction key ={item.id} item = {item}/>)}
        </ul>
    </div>)
    }

    updateTransactionType = (event) => {
        const {initialtransactions} = this.state
        if (event.target.value === 'debit'){
                let data = initialtransactions.filter(item => item.type === 'debit')
                this.setState({alltransactions:data,type:'debit'})
        }
        else if (event.target.value === 'credit'){
            let data = initialtransactions.filter(item => item.type === 'credit')
            this.setState({alltransactions:data,type:'credit'})
        }
        else{
            this.setState({alltransactions:initialtransactions,type:'all'})
        }

    }

    render() {
        const {isLoading,msg,type} = this.state
        
        return(<div className='dashboard-page'>
        <SideBar name = 'transactions'/>
        <div className='dashboard-container'>
                <TopBar name = 'Transactions'/>
                <div className='select-transaction-type-bar'>
                        <button onClick = {this.updateTransactionType} value = 'all' className={`trans-type-btn ${type === 'all' ? 'highlight2':''}`}> All Transactions</button>
                        <button onClick = {this.updateTransactionType} value = 'debit' className={`trans-type-btn ${type === 'debit' ? 'highlight2':''}`}>Debit</button>
                        <button onClick = {this.updateTransactionType} value = 'credit' className={`trans-type-btn ${type === 'credit' ? 'highlight2':''}`}>Credit</button>
                </div>
                {isLoading ? this.renderLoading() : this.renderData()}
                {msg !== ''?<h1 className='latest-transaction-heading'>{msg}</h1>:''}
        </div>
    </div>)
    }
}
export default Transactions
