import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import surveyCtrl from '../controllers/survey.controller.js'

const router = express.Router()

router.route('/api/surveys')
  .get(surveyCtrl.list)

router.route('/api/survey/:surveyId')
  .get(surveyCtrl.read)

router.route('/api/surveys/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, surveyCtrl.listByOwner)

router.route('/api/surveys/:surveyId')
  .put(authCtrl.requireSignin, surveyCtrl.isOwner, surveyCtrl.update)
  .delete(authCtrl.requireSignin, surveyCtrl.isOwner, surveyCtrl.remove)

router.param('surveyId', surveyCtrl.surveyByID)
router.param('userId', userCtrl.userByID)

export default router
