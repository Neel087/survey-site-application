import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { read, listRelated } from './api-question.js'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex: {
    display: 'flex'
  },
  card: {
    padding: '24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link: {
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    bresponseRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
}))

export default function Question({ match }) {
  const classes = useStyles()
  const [question, setQuestion] = useState({ survey: {} })
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ questionId: match.params.questionId }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setQuestion(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.questionId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listRelated({
      questionId: match.params.questionId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setSuggestions(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.questionId])

  return (
    <div className={classes.root}>
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
    </div>)
}
