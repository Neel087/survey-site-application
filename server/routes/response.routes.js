import express from 'express'
import responseCtrl from '../controllers/response.controller.js'
import questionCtrl from '../controllers/question.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import surveyCtrl from '../controllers/survey.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

// TODO

router.param('userId', userCtrl.userByID)
router.param('surveyId', surveyCtrl.surveyByID)
router.param('questionId', questionCtrl.questionByID)
router.param('responseId', responseCtrl.responseByID)

export default router
