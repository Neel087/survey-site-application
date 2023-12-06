import express from 'express'
import responseCtrl from '../controllers/response.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import surveyCtrl from '../controllers/survey.controller.js'

const router = express.Router()

router.route('/api/responses/:surveyId')
    .post(responseCtrl.create)

router.route('/api/responses/survey/:surveyId')
    .get(authCtrl.requireSignin, responseCtrl.listBySurvey)

router.param('surveyId', surveyCtrl.surveyByID)

export default router
