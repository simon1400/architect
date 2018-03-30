import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import PageLayout from './layouts/PageLayout'
import AdminLayout from './layouts/AdminLayout'
// import Error from './404';

import Edit from './components/Edit'
import ShortPages from './components/ShortPages'

import Home from './site/Home'
import Project from './site/Project'

import './styles/layout.css'


const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

class App extends Component {
  componentDidMount() {
  //   this.props.fetchUser();
        this.props.getData();
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <AppRoute exact path={`/`} layout={PageLayout} component={Home} />
            <AppRoute exact path={`/project/:id`} layout={PageLayout} component={Project} />
            <AppRoute exact path={'/admin'} layout={AdminLayout} component={ShortPages} />
            <AppRoute exact path={'/admin/editor/:type(new|edit)/:id'} layout={AdminLayout} component={Edit} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default connect(null, actions)(App);
