import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';



class DisplayConversationsList extends Component {

    render() {
        const {classes} = this.props

        return (
            <main className={classes.root}>
                <Button variant='contained' fullWidth color='primary' className={classes.newChatBtn}
                    onClick = {this.newChat}>New Chat Button</Button>
                <List>
                    {
                        this.props.chats.map((el, i) =>(
                            <div key={i}>
                            <ListItem onClick={() => this.props.clicked(i)} className={classes.listItem}
                                selected={this.props.selectChat === i}
                                alignItems='flex-start'  key={i}>
                                <ListItemAvatar><Avatar alt='Remy Sharp'>
                                    {el.users.filter(userEl => userEl !== this.props.user)[0].charAt(0)}
                                </Avatar></ListItemAvatar>
                                <ListItemText primary={el.users.filter(userEl => userEl !== this.props.user)[0]} secondary={
                                    <React.Fragment><Typography component='span' color='textPrimary'>
                                        {el.messages ? el.messages[el.messages.length - 1].message.substring(0, 30) : 'No messages' }
                                    </Typography></React.Fragment>
                                }>
                                </ListItemText>
                                {
                                    this.showUnreadIcon(el) ?
                                    <ListItemIcon><NotificationImportant className={classes.unreadMessage} /></ListItemIcon>
                                    : null
                                }
                            </ListItem>
                            <Divider />
                            </div>
                        ))
                    }
                </List>
            </main>
        );
    }
    newChat = () => {
        console.log('newChat')
    }
    selectChat = (i) => {
        console.log(i)
    }

    showUnreadIcon = (chat) => {
        if (chat.read === false && this.props.messageSeenByReceiver(this.props.user, chat)) return true
        else return false
    }
}

export default withStyles(styles)(DisplayConversationsList);