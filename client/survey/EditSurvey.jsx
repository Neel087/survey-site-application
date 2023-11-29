import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from '../auth/auth-helper.js'
import { makeStyles } from '@material-ui/core/styles'
import { read, update } from './api-survey.js'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import MyQuestions from './../question/MyQuestions'

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
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  }
}))

export default function EditSurvey({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    description: '',
    redirect: false,
    error: '',
    id: ''
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      surveyId: match.params.surveyId
    }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, id: data._id, name: data.name, description: data.description, owner: data.owner.name })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const clickSubmit = () => {
    let surveyData = {
      name: values.name || undefined,
      description: values.description || undefined,
    }
    console.log(surveyData)
    update({
      surveyId: match.params.surveyId
    }, {
      t: jwt.token
    }, surveyData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, 'redirect': true })
      }
    })
  }
  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  if (values.redirect) {
    return (<Redirect to={'/owner/surveys'} />)
  }
  return (<div className={classes.root}>
    <Grid container spacing={8}>
      <Grid item xs={6} sm={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h2" className={classes.title}>
              Edit Survey
            </Typography>
            <br />
            <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" required/><br />
            <TextField
              id="multiline-flexible"
              label="Description"
              required
              multiline
              rows="3"
              value={values.description}
              onChange={handleChange('description')}
              className={classes.textField}
              margin="normal"
            /><br />
            <Typography type="subheading" component="h4" className={classes.subheading}>
              Owner: {values.owner}
            </Typography><br />
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}
              </Typography>)
            }
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={6} sm={6}>
        <MyQuestions surveyId={match.params.surveyId} />
      </Grid>
    </Grid>
  </div>)
}
