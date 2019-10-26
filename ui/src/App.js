import React, { useGlobal } from "reactn";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
// import NotFound from './pages/NotFound';
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import CreateBet from "./pages/CreateBet";
import Games from "./pages/Games";
import ConfirmBet from "./pages/ConfirmBet"

const NavBar = () => {
  const { 0: token } = useGlobal("token");

  return (
    <nav>
      <div className="log-out-container">
        </div>
      <div className="nav-bar">
        {token && (
          <span>
            <Link type="li" to="/">
              Home
            </Link>
          </span>
        )}
        {!token && (
          <span>
            <Link type="li" to="/login">
              Login
            </Link>
          </span>
        )}
        {!token && (
          <span>
            <Link type="li" to="/sign-up">
              Sign up
            </Link>
          </span>
        )}
        {token && (
            <span>
              <Link to="/profile">Profile</Link>
            </span>
        )}
        {token && (
          <span>
            <Link to="/games">Games</Link>
          </span>
        )}
       
      {token && (
        <span className="log-out-button">
           <Logout />
         </span>
        )}
        
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="main-page">
      <Router>
        <NavBar />
        <PrivateRoute path="/games" component={Games} />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/create-bet" component={CreateBet} />
        <PrivateRoute path="/confirm-bet" component={ConfirmBet} />
        {/* <Route component={NotFound} /> */}
      </Router>
    </div>
  );
}

export default App;
