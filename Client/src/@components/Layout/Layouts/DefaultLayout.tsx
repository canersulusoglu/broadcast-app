import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import * as Actions from '@App/@store/actions';
import { Nav, Dropdown, Icon, Navbar, Container, Header, Content, Avatar, Divider, Toggle } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import { SwitchThemeModeButton, SelectLanguageButton } from '@App/@components';
import history from '@App/history';

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    const dispatch = useDispatch();
    const User = useSelector((state : any) => state.Auth.User);
    const LogOutClick = () =>{
      dispatch(Actions.logout());
    }

    return (
      <Navbar {...props}>
        <Navbar.Header>
          <a href="#" className="navbar-brand logo" style={{padding: "18px 20px", display: 'inline-block'}}>
            RSUITE
          </a>
        </Navbar.Header>
        <Navbar.Body>
          <ResponsiveNav moreText={<Icon icon="more" />} moreProps={{ noCaret: true }} onSelect={onSelect} activeKey={activeKey}>
            <ResponsiveNav.Item onSelect={() => history.push('/')} eventKey="1" icon={<Icon icon="home" />}>
              Home
            </ResponsiveNav.Item>
          </ResponsiveNav>
          <Nav pullRight>
            { User?.username != undefined ? 
                <Dropdown className="profiledropdown" placement="bottomEnd" icon={<Avatar style={{marginRight: '10px'}} size="sm" src={String(User.ProfileImage)} />} alt={User.displayName.substring(0,2).toUpperCase()} title={User.displayName}>
                    <div style={{padding: 10, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span className="textColor" style={{marginRight: 10}}>Çevrimiçi</span>
                        <Toggle size="md" checkedChildren={<Icon icon="check" />} unCheckedChildren={<Icon icon="close" />} />
                    </div>
                    <Divider style={{margin: '5px'}}/>
                    <Dropdown.Item icon={<><i style={{marginRight: '10px'}} className="fad fa-id-card"/></>}>Channel</Dropdown.Item>
                    <Dropdown.Item icon={<><i style={{marginRight: '10px'}} className="fad fa-user-friends"/></>}>Friends</Dropdown.Item>
                    <Dropdown.Item icon={<><i style={{marginRight: '10px'}} className="fad fa-heart"/></>}>Followings</Dropdown.Item>
                    <Dropdown.Item icon={<><i style={{marginRight: '10px'}} className="fad fa-stars"/></>}>Subscriptions</Dropdown.Item>
                    <Divider style={{margin: '5px'}}/>
                    <Dropdown.Item onSelect={() => history.push("/settings")} icon={<><i style={{marginRight: '10px'}} className="fad fa-cogs"/></>}>Settings</Dropdown.Item>
                    <Divider style={{margin: '5px'}}/>
                    <Dropdown.Item icon={<><i style={{marginRight: '10px'}} className="fad fa-sign-out-alt"/></>} onSelect={LogOutClick}>Log Out</Dropdown.Item>
                </Dropdown> : null
            }
            <Nav.Item renderItem={() =>{
              return (
                <div style={{display: 'inline-block', padding: '10px'}}>
                  <SwitchThemeModeButton/>
                </div>
              )
            }}/>
            <Nav.Item renderItem={() =>{
              return (
                <div style={{display: 'inline-block', padding: '5px'}}>
                  <SelectLanguageButton/>
                </div>
              )
            }}/>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
};

function DefaultLayout(props){
    const [activeKey, setActiveKey] = useState(null);

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    }

    return(
        <div className="nav-wrapper">
            <NavBarInstance appearance="inverse" activeKey={activeKey} onSelect={handleSelect} />
            <Container style={{padding: '20px', margin: '20px'}}>
                {
                (props.pageHeader) != undefined 
                ?
                  <Header style={{marginBottom: 10}}>
                      <h2 style={{fontSize: 32}}>{props.pageHeader}</h2>
                  </Header>
                : null
                }
                <Content>
                    { props.children }
                </Content>
            </Container>
        </div>
    )
}

export default DefaultLayout;