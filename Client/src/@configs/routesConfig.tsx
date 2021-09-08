import React from 'react';
import { Redirect } from 'react-router-dom';
import authRoles from '@App/@configs/authRoles';
import { Utils } from '@App/@components';

export type RouteType = {
    exact?      :  boolean | false,
    path       :  string,
    component  :  React.LazyExoticComponent<any>,
    layout?    :  LayoutType | "default",
    pageHeader?:  string
}

export type RoutesType = {
    auth? : Array<string>,
    routes: Array<RouteType>
}

export type LayoutType = "default" | "auth" | "dashboard" | "admin_panel";

const HomeRoute : RoutesType = {
    routes  : [
        {
            exact    : true,
            path     : '/',
            component: React.lazy(() => import('../@views/Home')),
            layout   : "default"
        },
        {
            exact    : true,
            path     : '/stream/:username',
            component: React.lazy(() => import('../@views/Stream')),
            layout   : "default"
        },
    ]
}

const AuthRoutes : RoutesType = {
    auth    : authRoles.guest,
    routes  : [
        {
            exact    : true,
            path     : '/auth/login',
            component: React.lazy(() => import('../@views/Auth/Login')),
            layout   : "auth"
        },
        {
            exact    : true,
            path     : '/auth/register',
            component: React.lazy(() => import('../@views/Auth/Register')),
            layout   : "auth"
        }
    ]
}

const MainRoutes : RoutesType = {
    auth    : authRoles.user,
    routes  : [
        {
            exact    : true,
            path     : '/settings',
            component: React.lazy(() => import('../@views/Dashboard/Settings/Home')),
            layout   : "default",
            pageHeader: "Settings"
        }
    ]
}

const DashboardRoutes : RoutesType = {
    auth    : authRoles.user,
    routes  : [
        {
            exact    : true,
            path     : '/dashboard',
            component: React.lazy(() => import('../@views/Dashboard/Home')),
            layout   : "dashboard",
            pageHeader: "Dashboard Home Page"
        }
    ]
}

const ErrorRoutes : RoutesType = {
    auth    : authRoles.guest,
    routes  : [
		{
            path     : '/error-404',
            component: React.lazy(() => import('../@views/Errors/404')),
            layout   : "default"
        },
        {
            path     : '/error-500',
            component: React.lazy(() => import('../@views/Errors/500')),
            layout   : "default"
        }
    ]
};

const routeConfigs = [
    HomeRoute,
    AuthRoutes,
    MainRoutes,
    DashboardRoutes,
    ErrorRoutes
];
/*_____________________________________________________________*/
const RedirectComponent = () : JSX.Element =>{
    return(<Redirect to="/error-404" />)
}
RedirectComponent.displayName = 'RedirectComponent';  
/*_____________________________________________________________*/
const routes = [
    ...Utils.generateRoutesFromConfigs(routeConfigs),
    {
        component: RedirectComponent
    }
];

export default routes;