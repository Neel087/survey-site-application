import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { read } from './api-survey.js'
import QuestionsResponse from './../question/QuestionsResponse'
import { listBySurvey } from './../question/api-question.js'
import { useParams } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  questionTitle: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
}))

export default function SurveyResponse() {
  const classes = useStyles()
  const [survey, setSurvey] = useState('')
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')
  const { surveyId } = useParams();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listBySurvey({
      surveyId: surveyId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setQuestions(data)
      }
    })
    read({
      surveyId: surveyId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setSurvey(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }

  }, [surveyId])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listBySurvey({
      surveyId: surveyId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setQuestions(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }

  }, [surveyId])

  return (<div className={classes.root}>
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.details}>
              <Typography type="headline" component="h2" color="primary" className={classes.surveyTitle}>
                <strong>Survey Name:</strong> {survey.name}
              </Typography>
              <br />
              <Typography type="subheading" component="h4" className={classes.subheading}>
                <strong>Created by </strong> {survey.owner?.name} <strong> on </strong>
                {new Date(survey.created).toLocaleDateString('en-US')}
              </Typography>
              <br />
              <Typography type="subheading" component="h4" className={classes.subheading}>
                <strong>Description:</strong> {survey.description}
              </Typography>
            </div>
            <Typography type="subheading" component="h2" className={classes.subheading}>
              {survey.description}
            </Typography><br />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Card>
          <Typography type="title" component="h2" className={classes.questionTitle}>Answer following survey questions : </Typography>
          <QuestionsResponse questions={questions} searched={false} />
        </Card>
      </Grid>
    </Grid>
  </div>)
}
