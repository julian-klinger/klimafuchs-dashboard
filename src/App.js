import React, { Component } from 'react';
import { Login } from './components/login'
import { Nutzer } from './components/nutzer'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {token: ""}
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  loginTokenChanged = (token) => {this.setState({token: token})}

  render() {

    const isLoggedIn = localStorage.getItem('token')

    return(
      <div className="App">
        { isLoggedIn? (

          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Nutzerverwaltung
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Feed
                </NavLink>
              </NavItem>
                  <Button outline color="primary" onClick={() => localStorage.clear()} >Logout</Button>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Nutzer />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Feed Placeholder</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>

          ) : (<Login callBackRender={this.loginTokenChanged} />
        )}

      </div>
    )

  }
}

export default App;
