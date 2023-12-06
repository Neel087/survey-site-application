import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from '../lib/auth-helper.js'
import { makeStyles } from '@material-ui/core/styles'
import { read, update } from './api-question.js'
import { Link, Navigate, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
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

export default function EditQuestion() {
  const { questionId,surveyId } = useParams();

  const classes = useStyles()
  const [values, setValues] = useState({
    title: '',
    options: [''],
    redirect: false,
    error: ''
  })

  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      questionId: questionId
    }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, id: data._id, title: data.title, options: data.options })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleChange = name => event => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = () => {
    let questionData = {
      title: values.title || undefined,
      type: 'multiple_choice',
      options: values.options || [],
      survey_id: surveyId
    }
    update({
      surveyId: surveyId,
      questionId: questionId
    }, {
      t: jwt.token
    }, questionData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', redirect: true })
      }
    })
  }
  const handleOptionChange = (index) => (event) => {
    const newOptions = [...values.options];
    newOptions[index] = event.target.value;
    setValues({ ...values, options: newOptions });
  };

  const addOption = () => {
    setValues({ ...values, options: [...values.options, ''] });
  };

  const removeOption = (index) => () => {
    const newOptions = [...values.options];
    newOptions.splice(index, 1);
    setValues({ ...values, options: newOptions });
  };

  if (values.redirect) {
    return (<Navigate to={'/owner/survey/edit/' + surveyId} />)
  }
  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Question
        </Typography>
        <TextField
          id="title"
          label="Title"
          required
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        />
        {values.options.map((option, index) => (
          <div key={index} className={classes.optionContainer}>
            <TextField
              label={`Option ${index + 1}`}
              className={classes.textField}
              value={option}
              required
              onChange={handleOptionChange(index)}
              margin="normal"
            />
            <IconButton
              color="primary"
              onClick={removeOption(index)}
              className={classes.iconButton}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="contained" color="secondary" onClick={addOption} className={classes.addOptionButton}>
          + Add Option
        </Button>
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
        <Link to={'/owner/surveys/edit/' + surveyId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
      </CardActions>
    </Card>
  </div>)
}
