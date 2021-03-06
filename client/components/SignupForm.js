import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

    onSignup = ({ email, password }) => {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors })
        });
    }

    componentWillUpdate(nextProps) {
        /* Redirect the user to /dashboard based on this.props and nextProps
        */
       if (!this.props.data.user && nextProps.data.user) {
           // Forcefully redirect the user to /dashboard
           hashHistory.push('/dashboard');
       }
    }

    render() {
        return(
            <div>
                <h4>Signup</h4>
                <AuthForm errors={this.state.errors} onFormSubmit={this.onSignup} />
            </div>
        );
    }
}

export default graphql(query) (
    graphql(mutation) (SignupForm)
);
