import React from 'react';
import { Link } from 'react-router';

require('normalize.scss/normalize.scss');
require('assets/styles/layout.scss');

export default ({children}) => {
  return (
  	<div>
      
      <div>
        {children}
      </div>
   {/*}   <footer>
      	<a href="#">The Goods</a>
      	<a href="#">The Bad</a>
      	<a href="#">The Uglies</a>
      </footer>  */}
    </div>
  )
}
