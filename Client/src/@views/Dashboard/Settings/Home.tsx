import React, { useState } from 'react';
import {Nav, Icon} from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';

const Settings: React.FunctionComponent<{props: any}> = (props) =>{
    const [active, setActive] = useState('profile');

    const handleSelect = (activeKey) =>{
        setActive(activeKey);
    }

    const renderPage = (props) =>{
        switch(active){
            case 'profile':
                return (<ProfileSettings {...props}/>);
            case 'security':
                return (<SecuritySettings {...props}/>);
             case 'notification':
                return (<NotificationSettings {...props}/>);
            default:
                null
        }
    }

    return(
        <div>
            <ResponsiveNav appearance="tabs" activeKey={active} onSelect={handleSelect} style={{marginBottom: 20}}>
                <ResponsiveNav.Item eventKey="profile" icon={<Icon icon="profile" />}>
                    <span style={{fontSize: 16}}>Profile</span>
                </ResponsiveNav.Item>
                <ResponsiveNav.Item eventKey="security">
                    <span style={{fontSize: 16}}>Security and Privacy</span>
                </ResponsiveNav.Item>
                <ResponsiveNav.Item eventKey="notification">
                    <span style={{fontSize: 16}}>Notifications</span>
                </ResponsiveNav.Item>
            </ResponsiveNav>
            {renderPage(props)}
        </div>
    )
};

export default Settings;