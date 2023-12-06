import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './core/Home'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import NewSurvey from './survey/NewSurvey'
import Surveys from './survey/Surveys'
import MySurveys from './survey/MySurveys'
import Survey from './survey/Survey'
import SurveyResponse from './survey/SurveyResponse'
import EditSurvey from './survey/EditSurvey'
import NewQuestion from './question/NewQuestion'
import EditQuestion from './question/EditQuestion'

import Menu from './core/Menu'
import Thanks from './question/Thanks.jsx';
function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/surveys/all" element={<Surveys />} />
        <Route path="/surveys/:surveyId" element={<Survey />} />
        <Route path="/surveys/respond/:surveyId" element={<SurveyResponse />} />
        <Route path="/owner/surveys" element={
          <PrivateRoute><MySurveys />
          </PrivateRoute>} />
        <Route path="/owner/survey/new" element={
          <PrivateRoute><NewSurvey /></PrivateRoute>} />
        <Route path="/owner/survey/edit/:surveyId" element={
          <PrivateRoute><EditSurvey /></PrivateRoute>} />


        <Route path="/owner/:surveyId/questions/new" element={<PrivateRoute><NewQuestion /></PrivateRoute>} />
        <Route path="/owner/:surveyId/:questionId/edit" element={<PrivateRoute><EditQuestion /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default MainRouter
