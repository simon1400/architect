import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Page from '../site/Page';
import Admin from './Admin';
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
          <Route path="/" component={Page} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    )
  }
};

export default connect(null, actions)(App);
