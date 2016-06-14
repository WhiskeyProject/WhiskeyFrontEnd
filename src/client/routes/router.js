import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// layouts
import App from 'layouts/app';

// components
import NotFound from 'ui/notfound';
import LandingPage3 from 'ui/landingPage3';
import Login from 'ui/login';
import Signup from 'ui/signup';
import LikesPage2 from 'ui/likesPage2';
import HeaderComponent from 'ui/headerComponent';
import UserPage2 from 'ui/userPage2';
import ProductDetailPage from 'ui/productDetailPage';
import OriginalContentPage from 'ui/originalContentPage';
import TagFilterComponent from 'ui/tagFilterComponent';



export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
     	<Route path="/login" component={Login} />
     	<Route path="/signup" component={Signup} />
      <Route path='/likesPage2' component={LikesPage2} />
      <Route path='/headerComponent' component={HeaderComponent} />
      <Route path='/userPage2' component={UserPage2} />
      <Route path='/landingPage3' component={LandingPage3} />
      <Route path='/originalContentPage' component={OriginalContentPage} />
      <Route path='/productDetailPage/:id' component={ProductDetailPage} />
      <Route path='/tagFilterComponent' component={TagFilterComponent} />
      	<Route path='/' component={LandingPage3} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)
