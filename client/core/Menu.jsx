import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import companyLogo from '../assets/company_logo.png';

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff', background: '#f0483e' }
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff', background: '#f0483e' }
}
const Menu = withRouter(({ history }) => (
  <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Survey App
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home">
            <img src={companyLogo} alt="Logo" className="logo" style={{ width: '120px', height: 'auto' }}/>
          </IconButton>
        </Link>
        <Link to="/surveys/all">
          <Button style={isActive(history, "/surveys/all")}>All Surveys</Button>
        </Link>
      </div>
      <div style={{ 'position': 'absolute', 'right': '10px' }}><span style={{ 'float': 'right' }}>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            {auth.isAuthenticated().user && (<Link to="/owner/surveys"><Button style={isPartActive(history, "/owner/")}>My Surveys</Button></Link>)}
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
            </Link>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
          </span>)
        }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
