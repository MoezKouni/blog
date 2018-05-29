import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
    state = {
        login: true,
        firstName: '',
        lastName: '',
        usertName: '',        
        email: '',
        password: '',
    }

    render (){
        return(
            <div>
                <h4 className="mv3">{this.state.login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                {!this.state.login && ((
                <input
                    value={this.state.firstName}
                    onChange={e => this.setState({ firstName: e.target.value })}
                    type="text"
                    placeholder="Your firstname"
                />,
                <input
                    value={this.state.lastName}
                    onChange={e => this.setState({ lastName: e.target.value })}
                    type="text"
                    placeholder="Your lastname"
                />,
                <input
                    value={this.state.userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                    type="text"
                    placeholder="Your username"
                />
                ))}
                <input
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password"
                    placeholder="Choose a safe password"
                />
                </div>
                <div className="flex mt3">
                <div className="pointer mr2 button" onClick={() => this._confirm()}>
                    {this.state.login ? 'login' : 'create account'}
                </div>
                <div
                    className="pointer button"
                    onClick={() => this.setState({ login: !this.state.login })}
                >
                    {this.state.login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                </div>
                </div>
            </div>
        )
    }


    _confirm = async () => {
        const { firstName, lastName, userName, email, password } = this.state
        if(this.state.login) {
            const result = await this.props.login({
                variables: {
                    email,
                    password,
                },
            })

            const { token } = result.data.login
            this._saveUserData(token)
        } else {
            const result = await this.props.signup({
                variables: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                },
            })
            const { token } = result.data.signup
            this._saveUserData(token)
        }
        this.props.history.push('/')
        }


    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $firstName: String!, $lastName: String!, $userName: String!) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, userName: $userName) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signup' }),
  graphql(LOGIN_MUTATION, { name: 'login' }),
)(Login)