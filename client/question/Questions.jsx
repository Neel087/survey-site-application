import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Edit from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import DeleteQuestion from './DeleteQuestion.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block'
  }
}))

export default function Questions(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <List dense>
        {props.questions.map((question, i) => {
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
            </ListItem>
            <Divider /></span>
        })}
      </List>
    </div>)
}
Questions.propTypes = {
  questions: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}
