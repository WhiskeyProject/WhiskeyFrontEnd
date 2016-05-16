import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// layouts
import App from 'layouts/app';

// components
import NotFound from 'ui/notfound';
// import LandingPage from 'ui/landingPage';
import LandingPage2 from 'ui/landingPage2';
import LandingPage3 from 'ui/landingPage3';
import Login from 'ui/login';
import Signup from 'ui/signup';
import LikesPage from 'ui/likesPage';
import LikesPage2 from 'ui/likesPage2';
import UserPage from 'ui/userPage';
import UserPage2 from 'ui/userPage2';
import Item from 'ui/item';
import ProductDetailPage from 'ui/productDetailPage';



export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
     {/* 	<Route path="/" component={LandingPage} /> */}
     	<Route path="/login" component={Login} />
     	<Route path="/signup" component={Signup} />
      <Route path='/likesPage2' component={LikesPage2} />
      <Route path='/userPage' component={UserPage} />
      <Route path='/userPage2' component={UserPage2} />
      <Route path='/landingPage2' component={LandingPage2} />
      <Route path='/landingPage3' component={LandingPage3} />

      <Route path='/productDetailPage/:id' component={ProductDetailPage} />
      <Route path='/item' component={Item} />
      	<Route path='/' component={LandingPage3} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)
