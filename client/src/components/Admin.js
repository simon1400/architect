import React from 'react';
import {Route} from 'react-router-dom';
import Edit from './Edit'
import ShortPages from './ShortPages'


const Admin = ({match}) => {

  return(
      <div>
        <Route exact path={`${match.url}/`} component={ShortPages} />
        <Route exact path={`${match.url}/edit`} component={Edit} />
      </div>
  )
}

export default Admin;
