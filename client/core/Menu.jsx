import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import companyLogo from '../assets/company_logo.png';

const isActive = (location, path) => {
  if (location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff', background: 'rgb(64 71 113)' }
}
const isPartActive = (location, path) => {
  if (location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff', background: 'rgb(64 71 113)' }
}
export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Survey App
        </Typography>
        <div>
          <Link to="/">
            <IconButton aria-label="Home">
              <img src={companyLogo} alt="Logo" className="logo" style={{ width: '120px', height: 'auto' }} />
            </IconButton>
          </Link>
          <Link to="/surveys/all">
            <Button style={isActive(location, "/surveys/all")}>All Surveys</Button>
          </Link>
        </div>
        <div style={{ 'position': 'absolute', 'right': '10px' }}><span style={{ 'float': 'right' }}>
          {
            !auth.isAuthenticated() && (<span>
              <Link to="/signin">
                <Button style={isActive(location, "/signin")}>Sign In
                </Button>
              </Link>
            </span>)
          }
          {
            auth.isAuthenticated() && (<span>
              {auth.isAuthenticated().user && (<Link to="/owner/surveys"><Button style={isPartActive(location, "/owner/")}>My Surveys</Button></Link>)}
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
              </Link>
              <Button color="inherit" onClick={() => {
                auth.clearJWT(() => navigate('/'))
              }}>Sign out</Button>
            </span>)
          }
        </span></div>
      </Toolbar>
    </AppBar>
  );
};


