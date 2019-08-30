  
import React, {Component} from 'react';
import NewConversationForm from './ConversationsList/NewConversationForm/NewConversationForm';
import DisplayConversationsList from './ConversationsList/DisplayConversationsList.js';
import DisplayMessages from './Messages/DisplayMessages';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import { async } from 'q';

const firebase = require("firebase");

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            chatList: [],
            selectedChat: null,
            newChatFormVisible: false,
            user: null
        }
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <DisplayConversationsList 
                    clicked={this.selectChatHandler} history={this.props.history}
                    chats={this.state.chatList} selectChat={this.state.selectedChat} user={this.state.user}/>
                <Button onClick={() => this.signOut()} className={classes.signOutBtn}>Sign Out</Button>
                { 
                    this.state.newChatFormVisible ? <NewConversationForm />
                    : <DisplayMessages user={this.state.user}
                        messages = {this.state.chatList[this.state.selectedChat]}/>
                }
            </div>
        );
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
                this.props.history.push('/login');
            else {
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        await this.setState({
                            user: _usr.email,
                            chatList: chats,
                        //   friends: []
                        })
                    });
                }
        })
    }


    newChatHandler = () => {
        this.setState({newChatFormVisible: true, selectedChat: null})
    }

    selectChatHandler = (index) => {
        this.setState({selectedChat: index})
    }

    signOut = () => {
        firebase.auth().signOut().catch(err => console.log('signout err', err))
    }
}

export default withStyles(styles)(Dashboard);