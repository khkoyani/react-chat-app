import React, { Component } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");



class NewConversationForm extends Component {
    state = {
        friend: '', 
        message: ''
    }
    render() {
        const {classes} = this.props
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Send A Message</Typography>
                    <form className={classes.form} onSubmit={(e) => this.createNewChat(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-email'> Enter Your Friend's Email</InputLabel>
                            <Input required className={classes.input} autoFocus 
                                onChange={(e)=>this.typing('email', e)} id='new-chat-email' />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chat-message'> Enter Your Message</InputLabel>
                            <Input required className={classes.input}  
                                onChange={(e)=>this.typing('message', e)} id='new-chat-message' />
                        </FormControl>
                        <Button type='submit' className={classes.submit} fullWidth color='primary' variant='contained'>Send Message</Button>
                    </form>
                </Paper>
            </main>
        );
    }

    typing = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({friend: e.target.value})
                break;
            case 'message':
                this.setState({message: e.target.value})
                break;
            default:
                break;
        }
    }

    createNewChat = async(e) => {
        e.preventDefault()
        this.friendExists()
        this.sendMessageOrCreateNewChat()
        

        //check if chat exists in db

        //if chat exists then load it
    }

    friendExists = async () => {
        //check if friend exists in db
        const snapshot = await firebase.firestore().collection('users').get()
        const users = snapshot.docs.map(_doc => _doc.data().email) //creates a list of users in db
        return users.includes(this.state.friend)
    }

    sendMessageOrCreateNewChat = async () => {
        //if chat already exists then send message and load the chat else create new chat
        this.docKey = this.createDocKey()
        const chat = await firebase.firestore().collection('chats').doc(this.docKey).get()
        if (chat.exists) {
            this.props.routeMessage(this.state.message, this.docKey)  //returns dockey of the message
            this.props.updateSelectedChat(this.getExistingIndex())
            return chat.data()
        } else {

        }
        return chat.exists
    }

    getExistingIndex = (docKey=this.docKey) => {
        return this.props.chatList.findIndex(chat => {
            return chat.users.join(':')===docKey
        })    
    }

    createDocKey = (user=this.props.user, friend=this.state.friend) => {
        return [user, friend].sort().join(':')
    }

    // newChat = async (chat) 
}

export default withStyles(styles)(NewConversationForm);