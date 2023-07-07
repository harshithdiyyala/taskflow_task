import {Switch,Route} from  'react-router-dom'

import Login from './Components/LoginPage'
import Dashboard from './Components/Dashboard'
import NotFound from './Components/NotFound'
import Transactions from './Components/Transactions'
import Profile from './Components/Profile'
import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
   return(
      <Switch>
      <Route exact  path = "/login" component={Login}/>
      <ProtectedRoute exact path ="/" component = {Dashboard}/>
      <ProtectedRoute eaxct path ="/transactions" component = {Transactions}/>
      <ProtectedRoute exact path ="/profile" component = {Profile}/>
      <Route component = {NotFound}/>
      </Switch>
   )
}

export default App
