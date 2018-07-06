import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import DragHandle from './DragHandle'

const SortableArticlesItem = SortableElement(({value, index, column, deleteArticle, visible}) => {
	return <li key={value.index}>
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
				if(menuId === value.menuId){
					return <SortableArticlesItem key={`item-${value.index}`} index={index} value={value} column={column} visible={visible} deleteArticle={deleteArticle} />
				}
			})}
		</ul>
	)
})

export default SortableArticles;
