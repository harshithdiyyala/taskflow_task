import {Component} from 'react'
import Cookies from 'js-cookie'


class UpdateTransaction extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            id:props.item.id,
            name:props.item.transaction_name,
            type:props.item.type,
            category:props.item.category,
            amount:props.item.amount,
            date:new Date(props.item.date).toLocaleDateString(),
            success_msg:'', 
        }
        
    }

    updateForm =(event) => {
        this.setState({ [event.target.name ]: event.target.value})

    }
    
    updateTransaction = async(event) => {
        event.preventDefault();
        const {name,type,category,amount,date,id} = this.state
        
        const token = Cookies.get('token')
        const userDetails =  {id,name,type,category,amount,date}
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/update-transaction'
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-hasura-admin-secret':'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role':'user',
                'x-hasura-user-id':token
            },
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url,options);
        //const data = await response.json();
        
        if (response.ok === true){
            
            this.setState({success_msg:'Data Updation Successful'})
        }
        else {
            this.setState({success_msg:'Data Updation UnSuccessful'})
        }


    }
    

    render(){
        const {name,type,category,amount,date,success_msg} = this.state
        
        
        return(<div>
            
            
            <form className='login-form form1'>
            <label>Transaction Name</label>
                <input type = 'text' value = {name} onChange = {this.updateForm} name = 'name' placeholder='Enter Name'/>
                <label>Transaction Type (debit/credit)</label>
                <select id="myDropdown" name="type" onChange ={this.updateForm} className='select' placeholder ='Enter Transaction Type' selected = {type}>
                    <option value="debit" className='select'>Debit</option>
                    <option value="credit" className='select'>Credit</option>    
                </select>
                <label>Category</label>
                <select id="myDropdown1" name="category" onChange ={this.updateForm} className='select' placeholder ='Enter Category' selected ={category}>
                    <option value="service" className='select'>Service</option>
                    <option value="transfer" className='select'>Transfer</option>  
                    <option value = 'expenses' className='select'>Expenses</option>  
                    <option value = 'other' className='select'>Other</option>  
                </select>
                <label>Amount</label>
                <input type = 'text' value = {amount} onChange = {this.updateForm} name='amount' placeholder='Enter Amount'/>
                <label>Date</label>
                <input type = 'date' value = {date} onChange = {this.updateForm} name = 'date' placeholder = 'Select Date'/>
                <button type = 'button' onClick={this.updateTransaction}> Add Transaction</button>
            </form>
            {success_msg !== ''? <p> {success_msg}</p>:'' }
        </div>)
    }
}

export default UpdateTransaction