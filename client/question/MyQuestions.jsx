import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import { listBySurvey } from './api-question.js'
import DeleteQuestion from './DeleteQuestion.jsx'

const useStyles = makeStyles(theme => ({
  questions: {
    padding: '24px'
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: "8px"
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px'
  },
  details: {
    padding: '10px'
  },
}))

export default function MyQuestions(props) {
  const classes = useStyles()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listBySurvey({
      surveyId: props.surveyId
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setQuestions(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removeQuestion = (question) => {
    const updatedQuestions = [...questions]
    const index = updatedQuestions.indexOf(question)
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  return (
    <Card className={classes.questions}>
      <Typography type="title" className={classes.title}>
        Questions
        <span className={classes.addButton}>
          <Link to={"/owner/" + props.surveyId + "/questions/new"}>
            <Button color="primary" variant="contained">
              + New Question
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {questions.map((question, i) => {
          return <span key={i}>
            <ListItem>
              <div className={classes.details}>
                <Typography type="headline" component="h2" color="primary" className={classes.questionTitle}>
                  <strong>{`Q. ${i + 1})`}</strong> {question.title}
                </Typography>
                {question.options?.map((option, index) => (
                  <div key={index} className={classes.optionContainer}>
                    <Typography type="subheading" component="h4" className={classes.subheading}>
                      <strong>{`Option ${index + 1})`}</strong> {option}
                    </Typography>
                  </div>
                ))}
              </div>
              <ListItemSecondaryAction>
                <Link to={"/owner/" + question.survey_id._id + "/" + question._id + "/edit"}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteQuestion
                  question={question}
                  surveyId={props.surveyId}
                  onRemove={removeQuestion} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider /></span>
        })}
      </List>
    </Card>)
}
MyQuestions.propTypes = {
  surveyId: PropTypes.string.isRequired
}

