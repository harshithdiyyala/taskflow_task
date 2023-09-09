import {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import myImage from '../images/logo.jpg'
import myImage2 from '../images/Avatar.jpg'
import {MdOutlineLogout} from 'react-icons/md'
import {HiHome} from 'react-icons/hi'
import {AiOutlineTransaction} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import  { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Popup from 'reactjs-popup'

class SideBar extends Component {

    state = {id:0,name:'',email:'',type :'dashboard'} 

    logout =() =>  {
        const {history} = this.props
        Cookies.remove('token');
        history.replace('/login');
    }


    componentDidMount(){
      this.getDetails()

    }
    getDetails = async() => {
        const token = Cookies.get('token')
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
        const options = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-hasura-admin-secret':'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role':'user',
                'x-hasura-user-id':token
            }
        }
        const response = await fetch(url,options);
        const data = await response.json();
        console.log(data);
        if (response.ok === true){
            this.setState({id:token,name:data.users[0].name,email:data.users[0].email})
        }
        
    }

    

    render(){
        const {id,name,email,type} = this.state
        console.log(type);
        return(<div className='side-bar'>
            <div className='logo-container-side-bar'>
                <img src = {myImage} alt ='logo' className='logo-image' />
                <h1 className='logo-name'><span className='money'>Money</span><span className='matters'> Matters</span></h1>
                </div>
            <div className='link-container'>
                <ul >
                    <li >
                        <Link to ='/' className={`link-instance `}> <HiHome className={`icon ${this.props.name === 'Accounts' ? 'highlight1':''}`} size ='30' /><h1 className={`link ${this.props.name === 'Accounts' ? 'highlight':''}`}>Dashboard</h1></Link>
                    </li>
                    <li >
                        
                        <Link to ='/transactions' className={`link-instance`}> <AiOutlineTransaction className={`icon ${this.props.name === 'transactions' ? 'highlight1':''}`}  size ='30' /><h1 className={`link ${this.props.name === 'transactions' ? 'highlight':''}`}>Transactions</h1></Link>
                    </li>
                    <li >
                        
                        <Link to ='/profile' className={`link-instance`}> <BsFillPersonFill className={`icon ${this.props.name === 'profile' ? 'highlight1':''}`}  size ='30' /><h1 className={`link ${this.props.name === 'profile' ? 'highlight':''}`}>Profile</h1></Link>
                    </li>
                </ul>
                </div>  
            <div className='white-space'></div>    
            <div className='bottom-container'>
                <img src = {myImage2} alt = 'avatar'/>
                
                    {id === 0 ?<div >
        <ThreeDots type="ThreeDots" color="#0284c7" height={50} width={50} />
      </div> : <div className='details-container'>
            <p>{name}</p>
            <p>{email}</p>
        </div> }
                <Popup 
                    modal
                    trigger = {<button className='log-out-btn'><MdOutlineLogout size = '30'/>    </button>}    
                    className='popup-content'
                 >
                    {close => (
                    <div className ='popup'>
                        <MdOutlineLogout size = '30' color = '#718EBF'/> 
                        <div style = {{marginLeft:'10px'}}>
                        <h1 className= 'popup-heading'>Are you sure you want to log out? </h1>
                        <div>
                        <button className='org-log-out-btn' onClick = {this.logout}>Log Out</button>
                        <button type="button"className="trigger-button"  onClick={() => close()}>Cancel</button>
                        </div>
                        </div>
                    </div>)}
                    </Popup>
                
                </div>      

        </div>)
    }
}

export default withRouter(SideBar)