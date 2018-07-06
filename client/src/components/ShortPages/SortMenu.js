import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {Link} from 'react-router-dom'
import DragHandle from './DragHandle'
import SortableArticles from './SortArticles'

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

export default SortableMenu;
