import React, {useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {renderRoutes, matchRoutes} from 'react-router-config'
import {compose} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '@App/@store/actions';
import AppContext from '@App/AppContext';
import { Loading } from '@App/@components'
import DefaultLayout from './Layouts/DefaultLayout';
import AuthLayout from './Layouts/AuthLayout';
import DashboardLayout from './Layouts/DashboardLayout';
import AdminPanelLayout from './Layouts/AdminPanelLayout';
import i18n from '@App/i18n';

type ContextType = {
    routes: []
}

function Layout(props){
    const dispatch = useDispatch();
    const appContext = useContext(AppContext) as ContextType;
    const {routes} = appContext;
    const extraProps = {t: props.t,i18n: props.i18n};
    const {selectedMode, themeModes} = useSelector((state :any) => state.Theme);
    const { User } = useSelector((state :any) => state.Auth);

    useEffect(() => {
        if(Object.keys(themeModes).length == 0){
            const themeModes : any = {};
            themeModes.light = document.getElementById('theme-style');
            themeModes.light.parentElement.removeChild(themeModes.light);
            themeModes.dark = document.getElementById('theme-style');
            themeModes.dark.parentElement.removeChild(themeModes.dark);
            dispatch(Actions.loadThemeModes(themeModes)); // Load theme modes

            if(User?.Preferences?.theme){
                dispatch(Actions.switchThemeMode(User.Preferences.theme));
                document.head.appendChild(themeModes[User.Preferences.theme]);
            }else{
                document.head.appendChild(themeModes[selectedMode]);
            }
        }else{
            if(User?.Preferences?.theme){
                dispatch(Actions.switchThemeMode(User.Preferences.theme));
                document.head.appendChild(themeModes[User.Preferences.theme]);
            }else{
                document.head.appendChild(themeModes[selectedMode]);
            }
        }

        if(User?.Preferences?.language){
            i18n.changeLanguage(User.Preferences.language);
        }
    }, []);

    const RenderLayout : any = ({pathName, children}) =>{
        const match = matchRoutes(routes, pathName);
        const matchedRoute : any = match[0].route;
        const pageHeader = matchedRoute.pageHeader;

        if(matchedRoute != undefined){
            switch (matchedRoute.layout) {
                case "default":
                    return(
                        <DefaultLayout pageHeader={pageHeader}>{children}</DefaultLayout>
                    )
                case "auth":
                    return(
                        <AuthLayout pageHeader={pageHeader}>{children}</AuthLayout>
                    )
                case "dashboard":
                    return(
                        <DashboardLayout pageHeader={pageHeader}>{children}</DashboardLayout>
                    )
                case "admin_panel":
                    return(
                        <AdminPanelLayout pageHeader={pageHeader}>{children}</AdminPanelLayout>
                    )
                default:// Eşleşmeyen routelar buraya düşer
                    return(
                        <DefaultLayout pageHeader={pageHeader}>{children}</DefaultLayout>
                    )
            }
        }else{
            return(
                <DefaultLayout>{children}</DefaultLayout>
            )
        }
    }

    return(
        <React.Suspense fallback={<Loading {...props.loadingProps} />}>
            <RenderLayout pathName={props.location.pathname}>
                {renderRoutes(routes, extraProps)}
            </RenderLayout>
        </React.Suspense>
    )
}

export default compose<React.ComponentClass>(
    withRouter,
    withTranslation()
)(React.memo(Layout))
