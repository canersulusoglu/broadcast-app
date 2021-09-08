import React, { useState } from 'react';
import { Container, Sidebar, Sidenav, Nav, Dropdown, Icon, Header, Content, Navbar } from 'rsuite';

const NavToggle = ({ expand, onChange }) => {

    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          <Nav>
            <Dropdown
              placement="topStart"
              trigger="click"
              renderTitle={children => {
                return <Icon style={{width: 56, height: 56, lineHeight: '56px', textAlign: 'center'}} icon="cog" />;
              }}
            >
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </Nav>
  
          <Nav pullRight>
            <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
};

function AdminPanelLayout(props){
    const [expand, setExpand] = useState(true);

    const handleToggle = () => {
        setExpand(!expand);
    }

    return(
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 260 : 56}
                    collapsible
                >
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Header>
                            <div style={{padding: 18, fontSize: 16, height: 56, background: "#34c3ff", color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                            <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                            <span style={{ marginLeft: 12 }}> BRAND</span>
                            </div>
                        </Sidenav.Header>
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                                    User Group
                                </Nav.Item>
                                <Dropdown
                                    eventKey="3"
                                    trigger="hover"
                                    title="Advanced"
                                    icon={<Icon icon="magic" />}
                                    placement="rightStart"
                                >
                                    <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-3">Brand</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-4">Loyalty</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-5">Visit Depth</Dropdown.Item>
                                </Dropdown>
                                <Dropdown
                                    eventKey="4"
                                    trigger="hover"
                                    title="Settings"
                                    icon={<Icon icon="gear-circle" />}
                                    placement="rightStart"
                                >
                                    <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-2">Websites</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-3">Channels</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-4">Tags</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-5">Versions</Dropdown.Item>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={handleToggle} />
                </Sidebar>

                <Container style={{height: '100vh'}}>
                    <Header>
                        <h2>Page Title</h2>
                    </Header>
                    <Content style={{overflowY: 'auto'}}>
                        { props.children }
                    </Content>
                </Container>
            </Container>
        </div>
    )
}

export default AdminPanelLayout;