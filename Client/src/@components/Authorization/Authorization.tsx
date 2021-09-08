import React, { Component } from 'react';
import { Utils } from '@App/@components';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppContext from '@App/AppContext';
import history from '@App/history';
import { AuthService } from '@App/@services';
import * as Actions from '@App/@store/actions';
import { Alert } from 'rsuite';

class Authorization extends Component {
    state : any;
    props : any;
    constructor(props, context){
        super(props);
        const {routes} = context;
        this.state = {
            accessGranted: true,
            routes: routes
        };
    }

    AuthCheck = () => {
        AuthService.on('onAutoLogin', () => {
            /**
             * Sign in and retrieve user data from Api
             */
            AuthService.GetUser()
            .then((data : any) => {
                this.props.setUserData(data);
            })
            .catch(error => {
                Alert.error(error);
                // this.props.showMessage({title: error.title, message: error.body, variant: 'error'});
            })
        });

        AuthService.on('onAutoLogout', (message) => {
            if (message)
            {
                history.push('/error-500')
            }
            this.props.logout();
        });

        AuthService.init();
    };

    componentDidMount()
    {
        this.AuthCheck();
        
        if (!this.state.accessGranted)
        {
            this.redirectRoute();
        }
    }

    componentDidUpdate()
    {
        if (!this.state.accessGranted)
        {
            this.redirectRoute();
        }
    }

    static getDerivedStateFromProps(props, state)
    {
        const {location, userRole} = props;
        const {pathname} = location;

        const matched = matchRoutes(state.routes, pathname)[0];
        return {
            accessGranted: matched ? Utils.hasPermission(matched.route.auth, userRole) : true
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute()
    {
        const {location, userRole, history} = this.props;
        const {pathname, state} = location;
        const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
        /*
        User is guest
        Redirect to Login Page
        */
        if (!userRole || userRole.length === 0)
        {
            history.push({
                pathname: '/auth/login',
                state   : {redirectUrl: pathname}
            });
        }
        /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
        else
        {
            history.push({
                pathname: redirectUrl
            });
        }
    }

    render(){
        return this.state.accessGranted ? <React.Fragment> {this.props.children} </React.Fragment> : null;
    }
}

function mapStateToProps({Auth})
{
    return {
        userRole           : Auth.role
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout             : Actions.logout,
        setUserData        : Actions.setUserData
    },
    dispatch);
}

Authorization.contextType = AppContext;

export default withRouter<any,any>(connect(mapStateToProps, mapDispatchToProps)(Authorization));