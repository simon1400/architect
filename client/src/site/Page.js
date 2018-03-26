<<<<<<< HEAD
import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Home'

import './styles/page.css'

const Page = ({match}) => {

  return(
      <div className="container">
        <Route exact path={`${match.url}/`} component={Home} />
      </div>
  )
}

export default Page;
=======
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
>>>>>>> fixed_proj
