import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import { FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { useParams, Navigate } from 'react-router-dom';
import { create } from '../response/api-response.js';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px',
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px',
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
  },
  tile: {
    textAlign: 'center',
  },
  image: {
    height: '100%',
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left',
  },
  tileTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block',
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuestionsResponse(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { surveyId } = useParams();
  const classes = useStyles();
  const clickSubmit = () => {
    const answersData = props.questions.map((question, index) => ({
      question_id: question._id,
      answer: question.options[selectedOptions[index]],
    }));

    console.log({
      survey_id: surveyId,
      answers: answersData,
    });

    create({
      surveyId: surveyId
    }, answersData)
      .then(data => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('Response submitted successfully!');
          setRedirect(true);
        }
      })
      .catch(error => {
        console.error('Error submitting response:', error);
      });
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div>
      <div className={classes.root} style={{ textAlign: 'left' }}>
        <List dense>
          {props.questions.map((question, i) => (
            <span key={i}>
              <ListItem>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.questionTitle}>
                    <strong>{`Q. ${i + 1})`}</strong> {question.title}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup>
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className={classes.optionContainer}>
                          <FormControlLabel
                            value={option}
                            control={
                              <Radio
                                checked={selectedOptions[i] === optionIndex}
                                onChange={() => handleOptionChange(i, optionIndex)}
                              />
                            }
                            label={
                              <Typography type="subheading" component="h4" className={classes.subheading}>
                                <strong>{`${optionIndex + 1})`}</strong> {option}
                              </Typography>
                            }
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </div>
      <div style={{ textAlign: 'center' }}>
      <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
        Submit Survey Response
      </Button>
      </div>
      {redirect && <Navigate to="/thanks" />}
    </div>
  );
}

QuestionsResponse.propTypes = {
  questions: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
};
