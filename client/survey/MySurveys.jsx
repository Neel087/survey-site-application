import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import auth from '../auth/auth-helper.js'
import { listByOwner } from './api-survey.js'
import { Redirect, Link } from 'react-router-dom'
import DeleteSurvey from './DeleteSurvey.jsx'
import AddBoxIcon from '@material-ui/icons/AddBox'

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
  description: {
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: "8px"
  }
}))

export default function MySurveys() {
  const classes = useStyles()
  const [surveys, setSurveys] = useState([])
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByOwner({
      userId: jwt.user._id
    }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setSurveys(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removeSurvey = (survey) => {
    const updatedSurveys = [...surveys]
    const index = updatedSurveys.indexOf(survey)
    updatedSurveys.splice(index, 1)
    setSurveys(updatedSurveys)
  }

  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Surveys
          <span className={classes.addButton}>
            <Link to="/owner/survey/new">
              <Button color="primary" variant="contained">
                + New Survey
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {surveys.map((survey, i) => {
            return <span key={i}>
              <ListItem button>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.surveyTitle}>
                    <strong>Title:</strong> {survey.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={`${classes.subheading} ${classes.description}`}>
                    <strong>Description:</strong> {survey.description}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    <strong>Date Created : </strong>
                    {new Date(survey.created).toLocaleDateString('en-US')}
                  </Typography>
                </div>
                {auth.isAuthenticated().user && auth.isAuthenticated().user._id == survey.owner._id &&
                  (<ListItemSecondaryAction>
                    <Link to={"/owner/responses/" + survey.name + '/' + survey._id}>
                      <Button aria-label="Responses" color="primary">
                        View Responses
                      </Button>
                    </Link>
                    <Link to={"/owner/survey/edit/" + survey._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <DeleteSurvey survey={survey} onRemove={removeSurvey} />
                  </ListItemSecondaryAction>)
                }
              </ListItem>
              <Divider />
            </span>
          })}
        </List>
      </Paper>
    </div>)
}