import Survey from '../models/survey.model.js'
import errorHandler from './../helpers/dbErrorHandler.js'

const create = async (req, res) => {
  try {
    const survey = new Survey(req.body)
    survey.owner = req.profile
    let result = await survey.save()
    res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const surveyByID = async (req, res, next, id) => {
  try {
    let survey = await Survey.findById(id).populate('owner', '_id name').exec()
    if (!survey)
      return res.status('400').json({
        error: "Survey not found"
      })
    req.survey = survey
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve survey"
    })
  }
}

const update = async (req, res) => {
  let survey = req.survey
  survey.name = req.body.name
  survey.description = req.body.description
  survey.updated = Date.now()
  try {
    let result = await survey.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}

const remove = async (req, res) => {
  try {
    let survey = req.survey
    let deletedSurvey = survey.remove()
    res.json(deletedSurvey)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let surveys = await Survey.find()
      .populate('owner', 'name')
      .select('_id name description owner created');

    surveys = surveys.map(survey => ({
      _id: survey._id,
      name: survey.name,
      description: survey.description,
      owner: survey.owner._id,
      created: survey.created,
      ownerName: survey.owner ? survey.owner.name : null
    }));
    res.json(surveys)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByOwner = async (req, res) => {
  try {
    let surveys = await Survey.find({ owner: req.profile._id }).populate('owner', '_id name')
    res.json(surveys)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.survey && req.auth && req.survey.owner._id == req.auth._id
  if (!isOwner) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const read = (req, res) => {
  return res.json(req.survey)
}

export default {
  create,
  surveyByID,
  list,
  listByOwner,
  read,
  update,
  isOwner,
  remove
}
