import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { list } from './api-survey.js'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar: {
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  surveyTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  },
  takeSurveyButton: {
    marginTop: theme.spacing(2)
  },
}))
export default function Surveys() {
  const classes = useStyles()
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setSurveys(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Surveys
        </Typography>
        <List dense>
          {surveys.map((survey, i) => {
            return <div key={i}>
              <Divider />
              <ListItem button>
                <Typography type="subheading" component="h4" className={classes.subheading}>
                </Typography>
                <div className={classes.details}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1' }}>
                      <Typography type="headline" component="h2" color="primary" className={classes.surveyTitle}>
                        <strong>Survey Name:</strong> {survey.name}
                      </Typography>
                    </div>
                    <div style={{ flex: '1' }}>
                      <Typography type="subheading" component="h4" className={classes.subheading}>
                        <strong>Created by </strong> {survey.ownerName} <strong> on </strong>
                        {new Date(survey.created).toLocaleDateString('en-US')}
                      </Typography>
                    </div>
                  </div>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    <strong>Description:</strong> {survey.description}
                  </Typography>
                </div>
                <Button
                  component={Link}
                  to={"/surveys/respond/" + survey._id}
                  variant="contained"
                  color="primary"
                  className={classes.takeSurveyButton}
                >
                  Take Survey
                </Button>
              </ListItem>
              <Divider />
            </div>
          })}
        </List>
      </Paper>
    </div>)
}
