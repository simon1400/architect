import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header'
import Home from './Home'
import Project from './Project'

import './styles/page.css'

class Page extends Component {

  componentDidMount = () => {
    this.props.getMenu()
    this.props.getData();
  }


  render() {
    console.log(this.props.match);
    return(
        <div className="container Sites">
          <Header />
          <Route path={`/projects`} component={Home} />
          <Route exact path={`/project/:id`} component={Project} />
        </div>
    )
  }

}

export default connect(null, actions)(Page);
