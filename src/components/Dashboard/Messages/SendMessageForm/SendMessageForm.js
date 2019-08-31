import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles'

class SendMessageForm extends Component {
    state = {
        newMessage: '',
        valid: false,
        friend: this.props.friend
    }
    render() {
        const {classes} = this.props;
        let visibility = this.state.valid ? 'visible' : 'hidden'
        
        return (
            <div className={classes.chatTextBoxContainer}>
                <TextField fullWidth placeholder='Type your message..'
                    onKeyUp={(e) => this.typing(e)} id='msgField'
                    onFocus = {this.props.updateMessageRead} className={classes.chatTextBox} />
                <Send onClick={this.clickedSubmit} className={classes.sendBtn} visibility={visibility}/>
            </div>
        );
    }

    typing = (e) => {
        if (e.keyCode === 13) this.clickedSubmit()
        else this.messageIsValid(e.target.value) 
    }

    markRead = () => {
        // console.log('clicked input')
    }

    messageIsValid = (msg) => {
        if (msg.trim().length > 0) this.setState({newMessage: msg, valid:true})
        else this.setState({newMessage: msg, valid:false})
    }

    clickedSubmit = () => {
        if (this.state.valid) {
            document.getElementById('msgField').value = ''
            this.props.sendMessage(this.state.newMessage)
        } else return null
    }



    
}


export default withStyles(styles)(SendMessageForm);