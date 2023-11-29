import express from 'express'
import questionCtrl from '../controllers/question.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import surveyCtrl from '../controllers/survey.controller.js'

const router = express.Router()

router.route('/api/questions/by/:surveyId')
  .post(authCtrl.requireSignin, surveyCtrl.isOwner, questionCtrl.create)
  .get(questionCtrl.listBySurvey)

router.route('/api/questions')
  .get(questionCtrl.list)

router.route('/api/questions/:questionId')
  .get(questionCtrl.read)

router.route('/api/question/:surveyId/:questionId')
  .put(authCtrl.requireSignin, surveyCtrl.isOwner, questionCtrl.update)
  .delete(authCtrl.requireSignin, surveyCtrl.isOwner, questionCtrl.remove)

router.param('surveyId', surveyCtrl.surveyByID)
router.param('questionId', questionCtrl.questionByID)

export default router
