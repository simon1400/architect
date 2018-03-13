import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Edit from './Edit'
import ShortPages from './ShortPages'


const Admin = ({match}) => {
  
  return(
      <div>
        <h1>Admin</h1>
        <Route exact path={`${match.url}/`} component={ShortPages} />
        <Route exact path={`${match.url}/edit`} component={Edit} />
      </div>
  )
}

export default Admin;
