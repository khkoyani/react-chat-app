import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SendMessageForm from './SendMessageForm/SendMessageForm'


class DisplayMessages extends Component {

    componentDidUpdate = () => {
        const container = document.getElementById('messages-container')
        if(container){
            container.scrollTo(0, container.scrollHeight)
        }
    }

    render() {
        const {classes, chat, user} = this.props
        let renderedMessages =  (<main className={classes.content} id='messages-container'>
            <p>Select a chat from the chat list on the left</p>
            </main>)
        
        if (chat) { 
            this.friend = chat.users.filter(_user => _user !== user)[0]
            renderedMessages = (
                <div>
                    <div className={classes.chatHeader}>
                        Conversation with {this.friend}
                    </div>
                    <main className={classes.content} id='messages-container'>
                        {
                            chat.messages.map((msg, i) => (
                                <div className={msg.sender === user ? classes.userSent : classes.friendSent} key={i}>
                                    {msg.message}
                                </div>
                            ))
                        }
                    </main>
                    <SendMessageForm email={this.props.user} friend={this.friend} sendMessage={this.props.sendMessage}
                        updateMessageRead={(chat) => this.props.updateMessageRead(chat)}/>
                </div>
            )
        }
        
        return renderedMessages
    }
}

export default withStyles(styles)(DisplayMessages);



