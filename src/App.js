import React, { Component } from 'react';
import { Login } from './components/login'
import { Nutzer } from './components/nutzer'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Nutzer">Nutzer</Link>
        </li>
        <li>
          <button onClick={() => localStorage.clear()} >Logout</button>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/Nutzer" component={Nutzer} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

class App extends Component {

  constructor() {
    super()
    this.state = {token: ""}
  }

  loginTokenChanged = (token) => {this.setState({token: token})}

  render() {

    const isLoggedIn = localStorage.getItem('token')

    return(
      <div className="App">
        { isLoggedIn? (<BasicExample />) : (<Login callBackRender={this.loginTokenChanged} />) }
      </div>
    )

  }
}

export default App;
