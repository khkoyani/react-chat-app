import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login/Login.js'
import Signup from './components/Signup/Signup.js';
import Dashboard from './components/Dashboard/Dashboard.js';


const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: "AIzaSyBpqXwI8Ba3K4ZvMsjoZx5_2zTiH41ybc8",
    authDomain: "react-chat-appl.firebaseapp.com",
    databaseURL: "https://react-chat-appl.firebaseio.com",
    projectId: "react-chat-appl",
    storageBucket: "",
    messagingSenderId: "752145581469",
    appId: "1:752145581469:web:5a4841b1c21d8b4c"
})

const navigation = (
    <Router><div id='nav-container'>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
    </div></Router>
)

ReactDOM.render(navigation, document.getElementById('root'));
registerServiceWorker();

