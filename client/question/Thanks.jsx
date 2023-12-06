import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  icon: {
    fontSize: 80,
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
  },
}));

const Thanks = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckCircleIcon className={classes.icon} />
      <Typography variant="h4" gutterBottom>
        Thanks for your Response!
      </Typography>
    </div>
  );
};

export default Thanks;
