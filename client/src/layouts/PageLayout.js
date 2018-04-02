import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../site/Header'

import '../site/styles/page.css'

class PageLayout extends Component {

  componentDidMount() {
    this.props.getMenu()
    this.props.getSocial()
  }


  render() {
    return (
      <div className="container Sites">
        <Header />
        {this.props.children}
      </div>
    )
  }
};

export default connect(null, actions)(PageLayout);
