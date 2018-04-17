
import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header';


class AdminLayout extends Component {

  render(){
    return(
        <div className="Admin">
          <Header />
          <div className="sidenav bg-info">
            <Sidebar />
          </div>

          <div className="main">
            {this.props.children}
          </div>
        </div>
    )
  }
}

export default AdminLayout;
