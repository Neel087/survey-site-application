import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewSurvey from './survey/NewSurvey'
import Surveys from './survey/Surveys'
import MySurveys from './survey/MySurveys'
import Survey from './survey/Survey'
import EditSurvey from './survey/EditSurvey'
import NewQuestion from './question/NewQuestion'
import EditQuestion from './question/EditQuestion'


const MainRouter = () => {
  return (<div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />

      <Route path="/surveys/all" component={Surveys} />
      <Route path="/surveys/:surveyId" component={Survey} />
      <PrivateRoute path="/owner/surveys" component={MySurveys} />
      <PrivateRoute path="/owner/survey/new" component={NewSurvey} />
      <PrivateRoute path="/owner/survey/edit/:surveyId" component={EditSurvey} />


      <PrivateRoute path="/owner/:surveyId/questions/new" component={NewQuestion} />
      <PrivateRoute path="/owner/:surveyId/:questionId/edit" component={EditQuestion} />

    </Switch>
  </div>)
}

export default MainRouter
