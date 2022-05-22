import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { Link } from 'react-router-dom'
import SignOutButton from "./authentication/SignOutButton";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";

import MemoTripIndex from "./MemoTripIndex";
import MemoTripShowPage from "./MemoTripShowPage.js";
import NewMemoTripForm from "./NewMemoTripForm";

const App = ({ props, user }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const unauthenticatedListItems = [
    <div>
      <Link to="/memotrips">
        <li key="sign-in" className="card landing-card title">
        Memories
        </li>
      </Link>
    </div>,
    // <div>
    //   <Link to="/users/new"> 
    //     <li key="sign-up" className="card landing-card">
    //       Sign Up
    //     </li>
    //     </Link>
    // </div>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2 className="decorative-font show-page-card">Memo Trip: a digital memory scrapbook</h2>
          <div>
            {/* <ul className="landing-menu">
            <li>
              <Link to="/trips/new">
                Add a new trip
              </Link>
            </li> */}
            {user ? authenticatedListItems : unauthenticatedListItems}
          {/* </ul> */}
        </div>
        </Route>
        <Route exact path="/memotrips/new" component={NewMemoTripForm} />
        <Route exact path="/memotrips" component={MemoTripIndex} />
        <Route exact path="/memotrips/:id" component={MemoTripShowPage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
