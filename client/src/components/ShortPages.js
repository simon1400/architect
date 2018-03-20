import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions';

class ShortPages extends Component {

	componentDidMount() {
		this.props.getData();
	}

	renderArticle() {
		return(
			<div className="collection">
				{this.props.projects.map((item, index) => <a href="#!" key={index} className="collection-item">{item.title}</a>)}
			</div>
		)
	}

	render() {
		return(
			<div>
				<h3>Short Pages</h3>
				{this.renderArticle()}
				<button className="btn flat">Add</button>
			</div>
		)
	}
}

function mapStateToProps({ projects }) {
  return { projects };
}

export default connect(mapStateToProps, {getData})(ShortPages);
