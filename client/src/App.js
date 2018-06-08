import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import DocumentMeta from 'react-document-meta';

import PageLayout from './layouts/PageLayout'
import AdminLayout from './layouts/AdminLayout'
// import Error from './404';

import Edit from './components/Edit'
import ShortPages from './components/ShortPages'
import Social from './components/Social'
import Setting from './components/Setting'

import Home from './site/Home'
import Project from './site/Project'
import News from './site/News'
import Contacts from './site/Contacts'
import About from './site/About'

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
    this.props.getSettings();
  }

  render() {
    const meta = {
      description: this.props.setting.length > 0 ? this.props.setting[0].description : '',
      title: this.props.setting.length > 0 ? this.props.setting[0].title : '',
      meta: {
        name: {
          'theme-color': this.props.setting.length > 0 ? this.props.setting[0].themeColor : '#000000'
        }
      }
    }

    return (
      <DocumentMeta {...meta}>
        <Router>
          <div>
            {window.location.pathname === '/' ? <Redirect to="/projects" /> : null}
            <Switch>
              {/* Site routes */}
              <AppRoute exact path={`/projects`} layout={PageLayout} component={Home} />
              <AppRoute exact path={`/news`} layout={PageLayout} component={News} />
              <AppRoute exact path={`/contact`} layout={PageLayout} component={Contacts} />
              <AppRoute exact path={`/projects/:id`} layout={PageLayout} component={Project} />
              <AppRoute exact path={`/about`} layout={PageLayout} component={About} />

              {/* Admin routes */}
              <AppRoute exact path={'/admin'} layout={AdminLayout} component={ShortPages} />
              <AppRoute exact path={'/admin/social'} layout={AdminLayout} component={Social} />
              <AppRoute exact path={'/admin/setting'} layout={AdminLayout} component={Setting} />
              <AppRoute exact path={'/admin/editor/:type(new|edit)/:id'} layout={AdminLayout} component={Edit} />
            </Switch>
          </div>
        </Router>
      </DocumentMeta>
    )
  }
};

function mapStateToProps({ setting }) {
  return { setting };
}

export default connect(mapStateToProps, actions)(App);
