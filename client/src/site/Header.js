import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }


  renderMenu() {
		return this.props.menu.map((item, index) =>
			<li key={index}>
				<Link to={`/${item.name.toLowerCase()}`}>{item.name}</Link>
			</li>);
	}

  renderSocial() {
		return this.props.social.map((item, index) =>
			<li key={index}>
				<a href={`/${item.link}`}><i className={item.classname}></i></a>
			</li>);
	}

  handleClick() {
    this.setState({
        open: !this.state.open
    });
  }

  render() {
    return(
      <header className="row">
        <div className="logo col s2">
          <a href="/projects" style={{color: 'black'}}>Logo</a>
        </div>
        <div  className="col s10">
          <nav className="right topMenu show-on-large">
            <ul>{this.renderSocial()}</ul>
            <ul>{this.renderMenu()}</ul>
          </nav>
          <div className="hamburger hide-on-large-only">
            <div id="nav-icon3" className={this.state.open ? 'open' : null} onClick={() => this.setState({open: !this.state.open})}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <nav className={`mobileMenu hide-on-large-only${this.state.open ? ' show' : ''}`}>
            <ul>{this.renderMenu()}</ul>
            <ul>{this.renderSocial()}</ul>
          </nav>
        </div>
      </header>
    )
  }
}

function mapStateToProps({ menu, social }) {
  return { menu, social };
}

export default connect(mapStateToProps, actions)(Header);
