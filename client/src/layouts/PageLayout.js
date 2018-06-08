import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../site/Header'

import '../site/styles/page.css'

class PageLayout extends Component {

  componentDidMount() {
    this.props.getMenu()
    this.props.getSocial();
    this.props.getData();
  }


  render() {
    return (
      <div className="Sites container">
        <Header />
        {this.props.children}
      </div>
    )
  }
};

export default connect(null, actions)(PageLayout);
