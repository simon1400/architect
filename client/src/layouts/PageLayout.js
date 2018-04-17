import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
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
      <Container className="Sites">
        <Header />
        {this.props.children}
      </Container>
    )
  }
};

export default connect(null, actions)(PageLayout);
