import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SendMesageForm from './SendMessageForm/SendMessageForm';


class DisplayMessages extends Component {

    componentDidUpdate = () => {
        const container = document.getElementById('messages-contianer')
        if(container){
            container.scrollTo(0, container.scrollHeight)
        }
    }

    render() {
        const {classes, messages, user} = this.props
        console.log('selected', this.props.messages)
        let renderedMessages =  <main className={classes.content} id='messages-contianer'>
            <p>Select a chat from the chat list on the left</p>
            </main>

        if (messages) { renderedMessages = (
            <div>
                <div className={classes.chatHeader}>
                    Conversation with {messages.users.filter(_user => _user !== user)[0]}
                </div>
                <main className={classes.content} id='messages-contianer'>
                    {
                        messages.messages.map((msg, i) => (
                            <div className={msg.sender === user ? classes.userSent : classes.friendSent} key={i}>
                                {msg.message}
                            </div>
                        ))
                    }
                </main>
            </div>
        )}
        
        return renderedMessages
    }
}

export default withStyles(styles)(DisplayMessages);



