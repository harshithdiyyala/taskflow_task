import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import {BsCurrencyDollar} from 'react-icons/bs'
import creditImg from '../images/credit.jpg'
import debitImg from '../images/debit.jpg'
import Cookies from 'js-cookie'
import './index.css'

class DebitCredit extends Component{

    state  = {credit:'',debit:'',isLoading:true}

    componentDidMount() {
        this.getAmount()
    }

    getAmount = async() => {
        const token = Cookies.get('token');
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
        const options = {
            method:'GET',
            headers: {
            
                    'content-type':'application/json',
                    'x-hasura-admin-secret':'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                    'x-hasura-role':'user',
                    'x-hasura-user-id':token
                

            }
        }
        const response = await fetch(url,options);
        const data  = await response.json();
        console.log(data);
        if (response.ok === true && data.totals_credit_debit_transactions.length >= 1) {
        const {totals_credit_debit_transactions} = data
        const credit = totals_credit_debit_transactions[0].sum;
        const debit = totals_credit_debit_transactions[1].sum;
        this.setState({credit,debit,isLoading:false});
        }else {
            this.setState({credit:0,debit:0,isLoading:false})
        }
    }

    render() {
        console.log('inside debit credit');
        const {credit,debit,isLoading} = this.state
        return(<div className='debit-credit-container'>
            <div className='amount-container'>
                <div>
                {isLoading ?<div> <ThreeDots type="ThreeDots" color="#0284c7" height={50} width={50} /></div>:<div className='credit'><span ><BsCurrencyDollar size ='25'/></span><span>{credit}</span></div> }
                <p className=''>Credit</p>
                
                </div>
                <img src = {creditImg} alt = 'credit'/>
            </div>
            <div className='amount-container'>
                <div>
                {isLoading ?<div> <ThreeDots type="ThreeDots" color="#0284c7" height={50} width={50} /></div>:<div className='debit'><span ><BsCurrencyDollar size ='25'/></span><span>{debit}</span></div> }
                <p>Debit</p>
                </div>
                <img src ={debitImg} alt = 'debit'/>
            </div>
        </div>)
    }
}

export default DebitCredit


