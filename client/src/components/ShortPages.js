import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'reactstrap'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import '../styles/SortPages.css'

const DragHandle = SortableHandle(() => <i>::</i>);

const SortableArticlesItem = SortableElement(({value, index, column, deleteArticle, visible}) => {
	return <li key={index}>
		<div className="menuLi">
			<div className="articleShort">{value.title}</div>
			<span className="icons">
				<i className={`far ${value.column ? 'fa-check-square' : 'fa-square'}`} title="Big column" onClick={() => column(value._id, value.column)}></i>
				<a href={`/admin/editor/edit/${value._id}`} title="Edit article"><i className="far fa-edit"></i></a>
				<i className={`far ${value.visible ? 'fa-check-square' : 'fa-square'}`} title="Visible" onClick={() => visible(value._id, value.visible)}></i>
				<i className="far fa-trash-alt" title="Delete article" onClick={() => deleteArticle(value._id)}></i>
				<DragHandle />
			</span>
		</div>
	</li>
})
const SortableArticles = SortableContainer(({items, menuId, column, deleteArticle, visible}) => {
	return (
		<ul className="menuArticles">
			{items.map((value, index) => {
				if(menuId == value.menuId){
					return <SortableArticlesItem key={`item-${index}`} index={index} value={value} column={column} visible={visible} deleteArticle={deleteArticle} />
				}
			})}
		</ul>
	)
})

const SortableMenuItem = SortableElement(({value, index, onClickMnu, onChangeMnu, state, deleteData, saveMnu, column, deleteArticle, onSortArticlesEnd, visible}) => {

	return <li key={index}>
		<div className="menuLi">
			<input
				name={value._id}
				value={state[value._id] ? state[value._id].value : value.name}
				onChange={e => onChangeMnu(e)}
				disabled={state[value._id] ? state[value._id].disable : true}
			/>
			<span className="icons">
				<i className={state[value._id] ? state[value._id].disable ? "hide" : 'fas fa-save' : "hide"} title="Save" onClick={() => saveMnu(state[value._id].value, value._id)}></i>
				<i className="far fa-edit" title="Edit page name" onClick={() => onClickMnu(value._id, value.name)}></i>
				<i className="far fa-trash-alt" title="Delete page" onClick={() => deleteData(value._id)}></i>
				<Link to={`admin/editor/new/${value._id}`} title="Add article" className="addArticle"><i className="fas fa-plus"></i></Link>
				<DragHandle />
			</span>
			{state.articles ? <SortableArticles
				items={state.articles}
				menuId={value._id}
				column={column}
				deleteArticle={deleteArticle}
				onSortEnd={onSortArticlesEnd}
				visible={visible}
				useDragHandle={true}
			/> : null}
		</div>
	</li>
});
const SortableMenu = SortableContainer(({items, onClickMnu, onChangeMnu, state, saveMnu, deleteData, column, deleteArticle, onSortArticlesEnd, visible}) => {
	return (
		<ul>
			{items.map((value, index) => (
				<SortableMenuItem
					key={`item-${index}`}
					index={index}
					value={value}
					state={state}
					column={column}
					deleteData={deleteData}
					saveMnu={saveMnu}
					onClickMnu={onClickMnu}
					onChangeMnu={onChangeMnu}
					deleteArticle={deleteArticle}
					visible={visible}
					onSortArticlesEnd={onSortArticlesEnd}
				/>
			))}
		</ul>
	);
});

class ShortPages extends Component {

	state = {
		addMenu: false,
		addField: '',
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
