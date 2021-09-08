import React, { useState } from 'react';
import history from '@App/history';
import { Nav, Icon, Navbar, Container, Content } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import { SwitchThemeModeButton, SelectLanguageButton } from '@App/@components';

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar {...props}>
        <Navbar.Header>
          <a className="navbar-brand logo" style={{padding: "18px 20px", display: 'inline-block'}}>
            RSUITE
          </a>
        </Navbar.Header>
        <Navbar.Body>
          <ResponsiveNav moreText={<Icon icon="more" />} moreProps={{ noCaret: true }} onSelect={onSelect} activeKey={activeKey}>
            <ResponsiveNav.Item onClick={() => history.push("/")} eventKey="1" icon={<Icon icon="home" />}>
              Home
            </ResponsiveNav.Item>
          </ResponsiveNav>
          <Nav pullRight>
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

function AuthLayout(props){
    const [activeKey, setActiveKey] = useState(null);

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    }

    return(
        <div className="nav-wrapper">
            <NavBarInstance appearance="inverse" activeKey={activeKey} onSelect={handleSelect} />
            <Container style={{padding: '20px', margin: '20px'}}>
                <Content>
                    { props.children }
                </Content>
            </Container>
        </div>
    )
}

export default AuthLayout;