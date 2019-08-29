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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            loginError: ''
        }
    }

    render() {
        const cl = this.props.classes
        return (
            <main className={cl.main}>
                <CssBaseline />
                <Paper className={cl.paper}>
                    <Typography component='h1' variant='h5'>Log In</Typography>
                    <form onSubmit={(e) => this.loginSubmitHandler(e)} className={cl.form}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-email'>Enter Your Email</InputLabel>
                            <Input onChange={(e) => this.typing('email', e)} type='text' 
                                autoComplete='email' autoFocus id='login-email' />
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-password'>Create Password</InputLabel>
                            <Input onChange={(e) => this.typing('pw', e)} type='password' 
                                id='login-password' />
                        </FormControl>
                        <Button type='submit' color='primary' size='large' fullWidth 
                            variant='contained' className={cl.submit}>Log In</Button>
                    </form>
                    {this.state.loginError ? 
                        <Typography component='h5' variant='h6' className={cl.errorText}>
                            {this.state.loginError}
                        </Typography> : null}
                    <Typography component='h5' variant='h6' className={cl.noAccountHeader}>Need To Create An Account?</Typography>
                    <Link to='/signup' className={cl.signUpLink}>Sign Up!</Link>
                </Paper>  
            </main>
        );
    }

    typing = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'pw':
                this.setState({password: e.target.value})
                break;
            default:
                break;
        }
    }

    loginSubmitHandler = (e) => {
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(r => {
            this.props.history.push('/dashboard')
        })
        .catch(authErr => {
            console.log('authErr', authErr)
            this.setState({loginError: authErr.message})
        })

    }
}

export default withStyles(styles)(Login);