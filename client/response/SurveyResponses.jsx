import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import { listBySurvey } from './api-order.js'
import ProductOrderEdit from './ProductOrderEdit'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: '#434b4e',
    fontSize: '1.1em'
  },
  customerDetails: {
    paddingLeft: '36px',
    paddingTop: '16px',
    backgroundColor: '#f8f8f8'
  }
}))
export default function SurveyResponses({ match }) {
  const classes = useStyles()
  const [responses, setResponses] = useState([])
  const { surveyId } = useParams();


  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listBySurvey({
      surveyId
    }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        console.log(data)
      } else {
        setResponses(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleClick = index => event => {
    setOpen(index)
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Responses in {match.params.survey}
        </Typography>
        <List dense >
          {responses.map((response, index) => {
            return <span key={index}>
              <ListItem>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.surveyTitle}>
                    <strong>{`Q. ${i + 1})`}</strong> {response.surveyTitle}
                  </Typography>
                  {response.answers?.map((answer, index) => (
                    <div key={index} className={classes.answerContainer}>
                      <Typography type="subheading" component="h4" className={classes.subheading}>
                        <strong>{`Q${index + 1}.`}</strong> {answer.questionTitle}
                        <strong>{`Response : `}</strong> {answer.selectedAnswer}
                      </Typography>
                    </div>
                  ))}
                </div>
              </ListItem>
              <Divider />
            </span>
          })}
        </List>
      </Paper>
    </div>)
}
