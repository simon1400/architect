import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header';


class AdminLayout extends Component {

  render(){
    return(
        <div>
          <Header />
          <div className="sidenav cyan darken-4">
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
