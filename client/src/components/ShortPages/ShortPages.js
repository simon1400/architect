import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button } from 'reactstrap'
import {arrayMove} from 'react-sortable-hoc';

import '../../styles/SortPages.css'
import SortableMenu from './SortMenu'
import DragHandle from './DragHandle'

class ShortPages extends Component {

	state = {
		addMenu: false,
		addField: '',
		menu: [],
		articles: []
	}

	componentDidMount = () => {
		this.props.getMenu();
	}

	componentWillReceiveProps = (nextProps) => {
		nextProps.menu.sort((a, b) => {
		  if (a.index > b.index) return 1;
		  if (a.index < b.index) return -1;
		  return 0;
		});
		nextProps.articles.sort((a, b) => {
		  if (a.index > b.index) return 1;
		  if (a.index < b.index) return -1;
		  return 0;
		});
		this.setState({
			menu: nextProps.menu,
			articles: nextProps.articles
		})
  }

	onClickMnu = (e, value) => {
		this.setState({
		[e]: {
			disable: false,
			value: value
		}})
	}

	onChangeMnu = (e) => {
		this.setState({
			[e.target.name]: {
				value: e.target.value
		}})
	}

	deleteData = (id) => {
		delete this.state[id]
		this.props.deleteMenu(id)
		this.props.getMenu()
	}

	deleteArticle = (id) => {
		this.props.deleteArticle(id)
		this.props.getMenu()
	}

	AddMnu = (e) => {
		e.target.name ? this.setState({
			addField: e.target.value
		}) : this.setState({addMenu: !this.state.addMenu})
	}

	saveMnu = (menu, id) => {
		delete this.state[id]
		this.props.addMenu(menu, id)
		this.props.getMenu();
		this.setState({
			[id]: {
				disable: true
			},
			addField: '',
			addMenu: false
		})
	}

	renderAdd = () => {
		return <div className="addWrap">
				<input name="addField" value={this.state.addField} onChange={e => this.AddMnu(e)}/>
				<span className="addSave">
					<i className="fas fa-save" onClick={() => this.saveMnu(this.state.addField)}></i>
				</span>
			</div>
	}

	column = (id, column) => {
		this.props.updateArticleColumn(id, !column)
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			menu: arrayMove(this.state.menu, oldIndex, newIndex),
		});
		this.props.updateMenu(this.state.menu)
	};

	onSortArticlesEnd = ({oldIndex, newIndex}) => {
		this.setState({
			articles: arrayMove(this.state.articles, oldIndex, newIndex),
		});
		this.props.shortArticles(this.state.articles)
	};

	visible = (id, visible) => {
		this.props.updateArticleVisible(id, !visible)
	}

	render() {
		return(
			<div className="shortPages">
				<h3>Short Pages</h3>
				<Button color="success" className="addBtn" onClick={this.AddMnu}>{this.state.addMenu ? 'Hide' : 'Add'}</Button>
				<div style={{clear: 'both'}}></div>
				{this.state.addMenu ? this.renderAdd() : ''}
				{this.state.menu ? <SortableMenu
					items={this.state.menu}
					onSortEnd={this.onSortEnd}
					onClickMnu={this.onClickMnu}
					onChangeMnu={this.onChangeMnu}
					saveMnu={this.saveMnu}
					deleteData={this.deleteData}
					state={this.state}
					useDragHandle={true}
					column={this.column}
					visible={this.visible}
					deleteArticle={this.deleteArticle}
					onSortArticlesEnd={this.onSortArticlesEnd}
				/> : null}
			</div>
		)
	}

}

function mapStateToProps({ articles, menu }) {
  return { articles, menu };
}

export default connect(mapStateToProps, actions)(ShortPages);
