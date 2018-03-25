import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Home'

import './styles/page.css'

const Page = ({match}) => {

  return(
      <div className="container">
        <Route exact path={`${match.url}/`} component={Home} />
      </div>
  )
}

export default Page;
