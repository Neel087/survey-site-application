import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import unicornbikeImg from './../assets/images/unicornbikeImg.jpg';
import auth from './../lib/auth-helper'
import './Home.css';
import Signup from '../user/Signup';
import { useNavigate, Navigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

function Home() {
  const handleSignup = () => {
      zSignupPrevent();
  };
  const navigate = useNavigate();
  if (!auth.isAuthenticated()) {
      return (
          <div className="home-page">
              <div className="content-section">
                  <div className="description-section">
                      <h1>Experience the Craft of Survey Creation</h1>
                      <p>Create your survey in minutes. Reach your audience on every device. View results graphically and in real-time.</p>
                  </div>
                  <div className="signup-section">
                      <div className="form-container">
                          <h3>Signup for free to create online surveys now.</h3>
                          <Signup></Signup>
                      </div>
                  </div>
              </div>
          </div>
      );
  } else {
      // navigate('/owner/surveys')
      return (
          <Navigate to={{
              pathname: '/owner/surveys'
          }} />
      )
  }
}

export default Home;

/*const MyComponent = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Card Title
        </Typography>
        <CardMedia
          className={classes.media}
          image={unicornbikeImg}
          title="Unicorn Bike"
        />
        <Typography variant="body2" component="p">
          Card content goes here.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyComponent;*/

