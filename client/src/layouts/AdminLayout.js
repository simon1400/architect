import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header';

class AdminLayout extends Component {

  componentDidMount = () => {
    this.props.fetchUser();
    this.props.getData();
  }

  render(){
    return(
        <div className="Admin">
          <Header />
          {this.props.auth ? <div>
            <div className="sidenav bg-info">
              <Sidebar />
            </div>

            <div className="main">
              {this.props.children}
            </div>
          </div> : <h1 style={{marginTop: '100px', textAlign: 'center'}}>Sorry, please login</h1>}
        </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(AdminLayout);
