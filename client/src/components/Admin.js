import React from 'react';
import {Route} from 'react-router-dom';
import Edit from './Edit'
import ShortPages from './ShortPages'
import Sidebar from './Sidebar'
import Header from './Header';


const Admin = ({match}) => {

  return(
      <div>
        <Header />
        <div className="sidenav cyan darken-4">
          <Sidebar />
        </div>

        <div className="main">
          <Route exact path={`${match.url}/`} component={ShortPages} />
          <Route exact path={`${match.url}/editor/:type(new|edit)/:id`} component={Edit} />
        </div>
      </div>
  )
}

export default Admin;
