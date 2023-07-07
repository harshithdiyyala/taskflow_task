import {Component} from 'react'
import Cookies from 'js-cookie'


class UpdateTransaction extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
            type:this.props.type,
            category:this.props.category,
            amount:this.props.amount,
            date:this.props.date,
            success_msg:'', 
            id:this.props.id
        }
    }

    updateName =(event) => {
        this.setState({name:event.target.value})

    }
    updatetype = (event) => {
        this.setState({type:event.target.value})
    }
    updateCategory = event => {
        this.setState({category:event.target.value})
    }
    updateAmount = event => {
        this.setState({amount:event.target.value})
    }
    updateDate = (event)=> {
        this.setState({date:event.target.value})
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
            console.log('updation successful');
            this.setState({success_msg:'Data Updation Successful'})
        }
        else {
            this.setState({success_msg:'Data Updation UnSuccessful'})
        }


    }
    componentDidMount() {
        const {id} =  this.props
        this.setState({id})
    }

    render(){
        const {name,type,category,amount,date,success_msg} = this.state
        
        
        return(<div>
            
            
            <form className='login-form form1'>
                <label>Transaction Name</label>
                <input type = 'text' value = {name} onChange = {this.updateName} />
                <label>Transaction Type (debit/credit)</label>
                <input type = 'text' value ={type} onChange ={this.updatetype} />
                <label>Category</label>
                <input type = 'text' value = {category} onChange = {this.updateCategory} />
                <label>Amount</label>
                <input type = 'text' value = {amount} onChange = {this.updateAmount} />
                <label>Date</label>
                <input type = 'date' value = {date} onChange = {this.updateDate} />
                <button type = 'button' onClick={this.updateTransaction}> Submit</button>
            </form>
            {success_msg !== ''? <p> {success_msg}</p>:'' }
        </div>)
    }
}

export default UpdateTransaction