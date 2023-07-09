import {Component} from 'react'
import {Redirect,withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import myImage from '../images/logo.jpg'
import './index.css'

class Login  extends Component{
    state = {username:'',password:'',errorMsg:'',showPassword:false}

    updatePassword =  (event) => { this.setState({password:event.target.value})} 

    updateUserName =  (event) => { this.setState({username:event.target.value})}

    submitDetails = async(event) => {

        event.preventDefault();
        
        const {username,password} = this.state
        const {history} = this.props 

        //const userDetails = {username,password}
        if(password === '' || username === ''){
            this.setState({errorMsg:'*User Name or Password is not Provided'})
        }
        else{
            //console.log(typeof(username),password);
            const queryParams = new URLSearchParams;
            queryParams.append("email",username);
            queryParams.append("password",password);
            let url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?${queryParams.toString()}`
            let options = {
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
                },
                
            }

            const response = await fetch(url,options);
            const data = await response.json();
            console.log(data);
            console.log(response.ok);
            const {get_user_id} = data;
            

            if (response.ok === true && get_user_id.length > 0){
                    Cookies.set('token',get_user_id[0].id,{expires:30})
                    history.replace('/')
            }
            else{
                this.setState({errorMsg:'*Invalid Username or Password'})
            }
        }
    }

    render() {
        
        const {username,password,errorMsg,showPassword} = this.state
        
        const token = Cookies.get('token')
        if (token !== undefined){
            return <Redirect to ='/'/>
        }

        return(<div className='login-page'>
            <div className='login-container'>
                <div className='logo-container'>
                <img src = {myImage} alt ='logo' className='logo-image' />
                <h1 className='logo-name'><span className='money'>Money</span><span className='matters'> Matters</span></h1>
                </div>
                <form className='login-form'>
                    <label className='label' htmlFor='username'>USERNAME</label>
                    <input type= 'text' id = 'username' value = {username} placeholder = 'Enter User Name' onChange ={this.updateUserName}/>
                    <label className='label' htmlFor='pwd'>PASSWORD</label>
                    {showPassword ? <input type= 'text' id = 'pwd' value = {password} placeholder = 'Enter Password' onChange ={this.updatePassword}/>:<input type= 'password' id = 'pwd' value = {password} placeholder = 'Enter Password' onChange ={this.updatePassword}/>}
                    <div className='show'><input type = 'checkbox' onClick = {() => this.setState((prevState) => ({showPassword:!prevState.showPassword}))} className='checkbox'/><label>SHOW PASSWORD</label></div>
                    <button type = 'submit' onClick={this.submitDetails}>LOGIN</button>
                </form>
                {errorMsg !== ''? <p className='errorMsg'>{errorMsg}</p> :''}    
            </div>
        </div>)
    }
}

export default withRouter(Login);