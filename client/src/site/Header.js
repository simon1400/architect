import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { Row, Col } from 'reactstrap'

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
      <header>
        <Row>
          <Col sm="2" xs="2" className="logo">
            <a href="/projects" style={{color: 'black'}}>Overspace</a>
          </Col>
          <Col sm="10" xs="10">
            <nav className="right topMenu d-lg-block d-none">
              <ul>{this.renderSocial()}</ul>
              <ul>{this.renderMenu()}</ul>
            </nav>
            <div className="hamburger d-lg-none">
              <div id="nav-icon3" className={this.state.open ? 'open' : null} onClick={() => this.setState({open: !this.state.open})}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <nav className={`mobileMenu ${this.state.open ? ' show' : ''}`}>
              <ul>{this.renderMenu()}</ul>
              <ul>{this.renderSocial()}</ul>
            </nav>
          </Col>
        </Row>
      </header>
    )
  }
}

function mapStateToProps({ menu, social }) {
  return { menu, social };
}

export default connect(mapStateToProps, actions)(Header);
