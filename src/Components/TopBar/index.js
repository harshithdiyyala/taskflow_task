import {AiOutlinePlus,AiOutlineCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'


import AddTransaction from '../AddTransaction'

const TopBar = (props) => {
    const token = Cookies.get('token')
    
    const {name} = props
    
    return(<nav className='nav-bar'>
    <h1 className='nav-bar-heading'>{name}</h1> 
    <Popup
        modal
        trigger = {<button className={`add-transaction-btn ${token === '3' ? 'display': ''}`}>
                    <AiOutlinePlus className='add-icon' color = 'white' size = '20'/> 
                    <p>Add Transaction</p>
                    </button>}
        className='popup-content'            
    >
        {close => (
           <div className='add-transaction-popup'>
            <div className='sub'>
            <h1 className='add-transaction-heading'>Add Transaction</h1>
            <button className='trans-type-btn1' onClick={() => close()}> <AiOutlineCloseCircle color = '#fe5c73' size = '25'/> </button>
            </div>
        <AddTransaction/>
        </div> 
        )}
    </Popup>
    </nav>)

}

export default TopBar