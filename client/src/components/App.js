import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import Admin from './Admin';
import Sidebar from './Sidebar'
// import Error from './404';

import '../styles/layout.css'


class App extends Component {
  componentDidMount() {
  //   this.props.fetchUser();
        this.props.getData();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />

          <div className="sidenav cyan darken-4">
            <Sidebar />
          </div>

          <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </div>

        </div>
      </Router>
    )
  }
};

export default connect(null, actions)(App);
