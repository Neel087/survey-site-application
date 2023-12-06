import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../lib/auth-helper.js'
import { remove } from './api-question.js'

export default function DeleteQuestion(props) {
  const [open, setOpen] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteQuestion = () => {
    remove({
      surveyId: props.surveyId,
      questionId: props.question._id
    }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.question)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
  return (<span>
    <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
      <DeleteIcon />
    </IconButton>
    <Dialog open={open} onClose={handleRequestClose}>
      <DialogTitle>{"Delete " + props.question.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your question {props.question.title}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteQuestion} color="secondary" autoFocus="autoFocus">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </span>)

}
DeleteQuestion.propTypes = {
  surveyId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

