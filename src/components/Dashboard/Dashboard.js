  
import React, {Component} from 'react';
import NewConversationForm from './ConversationsList/NewConversationForm/NewConversationForm';
import DisplayConversationsList from './ConversationsList/DisplayConversationsList.js';
import DisplayMessages from './Messages/DisplayMessages';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';

const firebase = require("firebase");

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            chatList: [],
            selectedChat: null,  //index
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
                    chats={this.state.chatList} selectChat={this.state.selectedChat} user={this.state.user}
                    getLastMessage={this.getLastMessage} messageSeenByReceiver={this.messageSeenByReceiver}/>
                <Button onClick={() => this.signOut()} className={classes.signOutBtn}>Sign Out</Button>
                { 
                    this.state.newChatFormVisible ? <NewConversationForm />
                    : <DisplayMessages user={this.state.user}
                        chat = {this.state.chatList[this.state.selectedChat]}
                        sendMessage = {this.sendMessage} updateMessageRead={this.updateMessageRead}/>
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

    selectChatHandler = async (index) => {
        await this.setState({selectedChat: index})
        this.selectedChatFull = this.state.chatList[index]
        this.friend = this.selectedChatFull.users.filter(_user => _user !== this.state.user)[0]
        this.docKey = this.createDocKey()
        this.updateMessageRead()
    }

    signOut = () => {
        firebase.auth().signOut().catch(err => console.log('signout err', err))
    }
    
    createDocKey = (friend=this.friend, user=this.state.user) => {
        return [friend, user].sort().join(':')
    }

    getLastMessage = (chat=this.selectedChatFull) => {

        const lastIndex = chat.messages.length - 1
        
        return chat.messages[lastIndex]
    }

    messageSeenByReceiver = (user=this.state.user, chat=this.selectedChatFull) => {
        console.log(chat)
        return this.getLastMessage(chat).sender !== user
    }

    updateMessageRead = (chat) => {
        if(this.messageSeenByReceiver(chat)){
            firebase.firestore().collection('chats').doc(this.docKey).update({
                read: true
            })

        }
         
    }

    sendMessage = (msg) => {
        firebase.firestore().collection('chats').doc(this.docKey).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                message: msg,
                sender: this.state.user,
                timestamp: Date.now()
            }),
            read: false
        })
    }
}

export default withStyles(styles)(Dashboard);