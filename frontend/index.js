import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { rootReducer } from './rootReducer.js';


const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';

import { Page_courses } from './pages/courses';
import { Page_courses_new } from './pages/courses_new';
import { Page_courses_id } from './pages/courses_id';
import { Page_courses_id_review } from './pages/courses_id_review';
import { Page_courses_id_learn } from './pages/courses_id_learn';
import { Page_courses_id_edit } from './pages/courses_id_edit';
import { Page_profile_coursesLearnedByMe } from './pages/profile_coursesLearnedByMe';
import { Page_profile_coursesCreatedByMe } from './pages/profile_coursesCreatedByMe';
// import { ProfilePage } from './pages/profile';
import { RootPage } from './pages/root';
import { Page_test } from './pages/test';
import { Page_pleaseSignIn } from './pages/pleaseSignIn';

// common css
import './index.css';

import './fonts/font-awesome/scss/font-awesome.scss';

const auth = {
  onEnter: (nextState, transition, callback) => {
    if (!store.getState().authentication.currentUser) {
      transition({ pathname: '/please-sign-in' });
    }
    callback();
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="courses"            component={Page_courses}/>
      <Route path="courses/new"        component={Page_courses_new} {...auth}/>
      <Route path="courses/:id"        component={Page_courses_id}/>
      <Route path="courses/:id/edit"   component={Page_courses_id_edit} {...auth}/>
      <Route path="courses/:id/learn"  component={Page_courses_id_learn} {...auth}/>
      <Route path="courses/:id/review" component={Page_courses_id_review} {...auth}/>
      <Route path="profile/courses-learned-by-me" component={Page_profile_coursesLearnedByMe} {...auth}/>
      <Route path="profile/courses-created-by-me" component={Page_profile_coursesCreatedByMe} {...auth}/>

      <Route path="/please-sign-in" component={Page_pleaseSignIn}/>
      <Route path="/test" component={Page_test}/>
      <Route path="/" component={RootPage}/>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
