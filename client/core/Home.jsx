import React from 'react';
import './Home.css';
import Signup from '../user/Signup';
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router-dom'

function Home() {
    const handleSignup = () => {
        zSignupPrevent();
    };

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
        return (
            <Redirect to={{
                pathname: '/owner/surveys'
            }} />
        )
    }
}

export default Home;
