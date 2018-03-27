import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './Home'
import Header from './Header'

import './styles/page.css'

class Page extends Component {

  componentDidMount = () => {
    this.props.getMenu()
  }

  render() {
    return(
        <div className="container Sites">
          <Header />
          <Route exact path={`${this.props.match.url}/`} component={Home} />
        </div>
    )
  }

}

export default connect(null, actions)(Page);
