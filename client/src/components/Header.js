import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li style={{marginBottom: '0'}} className="nav-item"><a className="nav-link" href="/auth/google">Login With Google</a></li>;
      default:
        return <li style={{marginBottom: '0'}} className="nav-item" key="2"><a className="nav-link" href="api/logout">Logout</a></li>
    }
  }

  render() {

    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{zIndex: '1100'}}>
        <Link to='/admin' className="navbar-brand">
          Architect project
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav justify-content-end" style={{width: '100%'}}>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
