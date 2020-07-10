import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

import Header from  './components/Header.js'
import Home from  './components/Home.js'
import Signup from './components/Signup.js'
import Signin from './components/Signin.js'
import DashBoard from './components/Dashboard.js'
import reducers from './redux/reducers/index.js'
import authGuard from './components/HOCS/authGuard.js'
export default()=>{
  const jwtoken = localStorage.getItem('JWToken');
axios.defaults.headers.common['Authorization'] =jwtoken
  return (
    //the store takes in reducers a,an empty object and applyMiddleware
  	<Provider store={createStore(reducers,{
      //when we refresh  we are no longer authenticated
      //so it will show signin and signup and not signout
      //however we can save the token to the state
      //and tell the state that as long as we have the token the user
      //is authenticated
      auth:{
          token:jwtoken,
          isAuthenticated:jwtoken ? true :false
      }
    },applyMiddleware(reduxThunk))}>
    <BrowserRouter>
    <Header/>
    <div className="container">
    <Route exact path="/" component={Home} />
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/signin' component={Signin}/>
    <Route exact path='/dashboard' component={authGuard(DashBoard)}/>
</div>
  </BrowserRouter>
  </Provider>
    )
}