import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/sidebar.css'

class Sidebar extends Component {
  render() {
    return(
      <ul>
        <li><NavLink exact to='/admin' activeClassName="teal darken-4">Short pages</NavLink></li>
      </ul>
    )
  }
}

export default Sidebar;
