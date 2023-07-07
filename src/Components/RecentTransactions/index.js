import {Component} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'
import SingleTransaction from '../SingleTransaction'
import './index.css'

class RecentTransactions extends Component {

    state = {transactions:[],isLoading:true}

    componentDidMount(){
        this.getTransactions()
    }

    getTransactions = async() => {
            const token = Cookies.get('token');
            const queryParams = new URLSearchParams();
            queryParams.append('limit','3');
            queryParams.append('offset','0');
            const url = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?${queryParams.toString()}`

            const options = {
                method:'GET',
                headers :{
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                    "x-hasura-role":"user",
                    "x-hasura-user-id":token
                }
            }

            const response = await fetch(url,options);
            const data = await response.json();
            const {transactions} = data ;
            console.log(data);
            if(response.ok === true){
                this.setState({transactions,isLoading:false})
            }

    }

    render(){
        const {transactions,isLoading} = this.state

        return(<div className='recent-transactions-container'>
            <h1 className='latest-transaction-heading'> Last Transaction</h1>
            
                {isLoading ? <div style ={{margin:'auto'}}>
                 <TailSpin type="TailSpin" color="#0284c7" height={50} width={50} />
                    </div>:
                <ul className = 'transaction-list'>  
                    {transactions.map(item => <SingleTransaction key = {item.id} item ={item} />)}
                </ul>
                }
            
        </div>)
    }
}

export default RecentTransactions