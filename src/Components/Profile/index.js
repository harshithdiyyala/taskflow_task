import {Component} from 'react'
import SideBar from '../SideBar'
import TopBar from '../TopBar'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import profile from '../images/profile.jpg'
import './index.css'

class Profile extends Component {

    state = {isLoading:true,allDetails:[]}

    componentDidMount() {
        this.getProfileDetails()
    }

    getProfileDetails = async() => {
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
        
        const {users} = data
        console.log(users);
        if (response.ok === true){
            this.setState({allDetails:users,isLoading:false})
        }
    }

    renderLoading = () => {
        return(<div style ={{margin:'auto'}}>
        <TailSpin type="TailSpin" color="#0284c7" height={50} width={50} />
           </div>)
    }

    renderData = () => {
            const{allDetails} = this.state
            const {name,email,country,date_of_birth,city,permanent_address,postal_code,present_address} = allDetails[0]
            return(<div className='profile-details-container'>
                <img src ={profile} alt ='profile'/>
                <form className='profile-form'>
                    <label>YOUR NAME</label>
                    <input type = 'text' defaultValue = {name}/>
                    <label>EMAIL</label>
                    <input type = 'text' defaultValue = {email}/>
                    <label>DATE OF BIRTH</label>
                    <input type = 'text' defaultValue = {date_of_birth}/>
                    <label>PERMANENT ADDRESS</label>
                    <input type = 'text' defaultValue = {permanent_address}/>
                    <label>POSTAL CODE</label>
                    <input type = 'text' defaultValue = {postal_code}/>
                </form>
                <form className='profile-form'>    
                    <label>USERNAME</label>
                    <input type = 'text' defaultValue = {name}/>
                    <label>PRESENT ADDRESS</label>
                    <input type = 'text' defaultValue = {present_address}/>
                    <label>CITY</label>
                    <input type = 'text' defaultValue = {city}/>
                    <label>COUNTRY</label>
                    <input type = 'text' defaultValue = {country}/>
                </form>
            </div>)
    }

    render(){
        const {isLoading} = this.state
        return(<div className='dashboard-page'>
            <div><SideBar/></div>
            <div className='dashboard-container'>
                    <TopBar name = 'Profile'/>
                    <div className='profile-container'>
                        {isLoading ? this.renderLoading() : this.renderData()}
                    </div>
            </div>
        </div>)
    }
}

export default Profile 