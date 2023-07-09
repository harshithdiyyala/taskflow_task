import { BsCurrencyDollar ,BsFillArrowDownCircleFill,BsFillArrowUpCircleFill} from 'react-icons/bs'
import {FiEdit3} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import UpdateTransaction from '../UpdateTransaction'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'
import { useState } from 'react'

const SingleTransaction = (props) => {

    const [success_msg,setMsg] = useState('');
    const {item} = props
    const {transaction_name,category,date,amount,type} = item 
    const newDate = new Date(date)
    const dateString = newDate.toString();
    const month = dateString.slice(4,7);
    const day = newDate.getDate().toString();
    let hrs = newDate.getHours();
    const ap =  hrs > 12 ? "PM": "AM" 
    if (hrs > 12) hrs = hrs - 12;
    if (hrs < 10) hrs = "0"+hrs.toString();
    else hrs = hrs.toString();
    let minutes = newDate.getMinutes();
    if (minutes < 10 || minutes === 0) hrs = "0"+minutes.toString();
    else minutes = minutes.toString();
    const finaldate = day +' '+ month+', '+hrs+'.'+minutes+ ' '+ap;

    const token = Cookies.get('token');
    
    

    const deleteTransaction = async() => {
        const token = Cookies.get('token')
        const {id} = item
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'
        const options = {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'x-hasura-admin-secret':'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role':'user',
                'x-hasura-user-id':token
            },
            body:JSON.stringify({id})
        }

        const response = await fetch(url,options);
        
        if(response.ok === true){
            console.log('deletion successful');
            setMsg('Data deleted Successfully');
        }
        else{
            setMsg('Deletion Unsuccessful');
        }
    }


    return(<li className='list-item'>
        <div className='details-container1'>
        <div className="name-container">
            {type === 'debit' ?<BsFillArrowDownCircleFill color = '#FE5C73' size = '25'/>: <BsFillArrowUpCircleFill color = '#16dbaa' size = '25'/> }
            <p className = 'transaction-name'>{transaction_name}</p>
        </div>
        <p >{category}</p>
        <p >{finaldate}</p>
        {type === 'debit' ? <div className='debit'><span >-<BsCurrencyDollar size ='25'/></span><span>{amount}</span></div>:<div className='credit'><span >+<BsCurrencyDollar size ='25'/></span><span>{amount}</span></div>  }
        <div className='icons-container1'>
            <Popup
                modal
                trigger = {<button className={`edit-btn ${token === '3'?'display':''}`} type = 'button'><FiEdit3 size = '25' color ='#2d60ff' className='icon'/></button>}
            >
                {close => (
                    <>
                    <div className='add-transaction-popup'>
                    <div className='sub'>    
                    <h1 className='add-transaction-heading'>Update Transaction</h1>    
                    <button className='trans-type-btn1' onClick={() => close()}> <AiOutlineCloseCircle color = '#fe5c73' size = '25'/> </button>
                    </div>
                    <UpdateTransaction  item = {item}/>
                </div> 
                    
                    </>
                )}
            </Popup>
            <Popup
                modal
                trigger = {<button className={`edit-btn ${token === '3'?'display':''}`} type = 'button'><MdDelete size = '25' color = '#fe5c73' className='icon'/></button>}
            >
                {close => (
                    <>
                    <div className='add-transaction-popup'>
                    <div className='sub'>
                    <h1 className='add-transaction-heading'>Are you Sure you want to Delete this item?</h1>
                    <button className='trans-type-btn1' onClick={() => close()}> <AiOutlineCloseCircle color = '#fe5c73' size = '25'/> </button>
                    
                    </div>
                    <div className='delete-container'>

                        
                        <button type = 'button' className='org-log-out-btn' onClick = {deleteTransaction}>Delete</button>
                        <button className='trigger-button' onClick={()=> close()}>Cancel</button>
                    </div>
                    </div> 
                    {success_msg !== ''?<p className='errorMsg'>{success_msg}</p>:''}
                    </>
                )}
            </Popup>
        
        </div>
        </div>
        
    </li>)

}

export default SingleTransaction