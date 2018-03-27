import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {

  renderMenu() {
		return this.props.menu.map((item, index) =>
			<li key={index}>
				<Link to="">{item.name}</Link>
			</li>);
	}

  render() {
    return(
      <header className="row">
        <div className="logo col s2">
          <a href="/" style={{color: 'black'}}>Logo</a>
        </div>
        <div  className="col s10">
          <nav className="right topMenu">
            <ul>
              {this.renderMenu()}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

function mapStateToProps({ menu }) {
  return { menu };
}

export default connect(mapStateToProps, actions)(Header);
