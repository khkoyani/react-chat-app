import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles'
import {Link} from 'react-router-dom'
const firebase = require('firebase')


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            password2: null,
            signupError: ''
        }
        console.log(firebase.firestore().collection('users'))
    }

    render() {
        const cl = this.props.classes
        return (
            <main className={cl.main}>
                <CssBaseline />
                <Paper className={cl.paper}>
                    <Typography component='h1' variant='h5'>Sign Up!</Typography>
                    <form onSubmit={(e)=> this.submitSignup(e)} className={cl.form} >
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-email'>Enter Your Email</InputLabel>
                            <Input onChange={(e) => this.typing('email', e)} type='text' 
                                autoComplete='email' autoFocus id='signup-email' />
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password'>Create Password</InputLabel>
                            <Input onChange={(e) => this.typing('pw1', e)} type='password' 
                                id='signup-password' />
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-confirmation'>Re-Enter Password</InputLabel>
                            <Input onChange={(e) => this.typing('pw2', e)} type='password' 
                                id='signup-password-confirmation' />
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' disableFocusRipple={false} 
                            size='large' color='primary' className={cl.submit}>Create Account</Button>
                    </form>
                    {this.state.signupError ? 
                        <Typography component='h5' variant='h6' className={cl.errorText}>
                            {this.state.signupError}
                        </Typography> : null}
                    <Typography component='h5' variant='h6' className={cl.hasAccountHeader}>Already Have an Account?</Typography>
                    <Link to='/login' className={cl.logInLink}>Log In!</Link>
                </Paper>
            </main>
        );
    }

    typing = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'pw1':
                this.setState({password: e.target.value})
                break;
            case 'pw2':
                this.setState({password2: e.target.value})
                break;
            default:
                break;
        }
    }

    submitSignup = (e) => {

        e.preventDefault()
        if (!this.formIsValid()) {
            this.setState({signupError: 'Passwords do not match'})
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(r => {
            const User = {email: r.user.email}
            firebase.firestore().collection('users').doc(this.state.email)
            .set(User)
            .then(() => {this.props.history.push('/dashboard')})
            .catch(dbErr => {
                console.error('dbErr', dbErr)
                this.setState({signupError: dbErr.message})
            })
        })
        .catch(authErr => {
            console.error('authErr', authErr)
            this.setState({signupError: authErr.message})
        })
    }

    formIsValid = () => this.state.password === this.state.password2
}

export default withStyles(styles)(Signup);