import Question from '../models/question.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res, next) => {
  try {
    const question = new Question(req.body)
    question.type = 'multiple_choice'
    let result = await question.save()
    res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const questionByID = async (req, res, next, id) => {
  try {
    let question = await Question.findById(id).populate('survey_id', '_id name').exec()
    if (!question)
      return res.status('400').json({
        error: "Question not found"
      })
    req.question = question
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve question"
    })
  }
}

const read = (req, res) => {
  return res.json(req.question)
}

const update = async (req, res) => {
  let question = req.question
  question.title = req.body.title
  question.options = req.body.options
  try {
    let result = await question.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let question = req.question
    let deletedQuestion = await question.remove()
    res.json(deletedQuestion)

  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listBySurvey = async (req, res) => {
  try {
    let questions = await Question.find({ survey_id: req.survey._id }).populate('survey_id', '_id title').exec()
    res.json(questions)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  const query = {}
  if (req.query.search)
    query.name = { '$regex': req.query.search, '$options': "i" }
  if (req.query.category && req.query.category != 'All')
    query.category = req.query.category
  try {
    let questions = await Question.find(query).populate('survey_id', '_id name').exec()
    res.json(questions)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  questionByID,
  read,
  update,
  remove,
  listBySurvey,
  list,
}
