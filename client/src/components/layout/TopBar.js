import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button sign-up-button">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button sign-up-button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar menu-text-color">
      <div>
        <ul className="">
          <li className="menu-text-color">
            <Link to="/" className="menu-text-color">MemoTrip
              </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          {/* <li>
            <Link to="/memotrips/new">
              Add a new memory
            </Link>
          </li> */}
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
