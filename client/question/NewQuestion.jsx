import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import auth from '../lib/auth-helper.js'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-question.js'
import { Link, Navigate, useParams } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  optionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  addOptionButton: {
    marginLeft: '10px',
  }
}))

export default function NewQuestion() {
  const { questionId, surveyId } = useParams();
  const classes = useStyles()
  const [values, setValues] = useState({
    title: '',
    options: [''],
    redirect: false,
    error: ''
  })
  const jwt = auth.isAuthenticated()
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({ ...values, [name]: value })
  }
  const clickSubmit = () => {
    let questionData = {
      title: values.title || undefined,
      type: 'multiple_choice',
      options: values.options || [],
      survey_id: surveyId
    }
    create({
      surveyId: surveyId
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
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Question
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
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
            Submit
          </Button>
          <Link to={'/owner/survey/edit/' + surveyId} className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          New Question
        </Typography><br />
        <TextField id="title" label="Title" className={classes.textField} value={values.title} onChange={handleChange('title')} margin="normal" /><br />
        <TextField id="option" label="option" className={classes.textField} value={values.option} onChange={handleChange('option')} margin="normal" /><br />
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}</Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        <Link to={'/owner/survey/edit/' + surveyId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
      </CardActions>
    </Card>
  </div>)
}
