import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fibonacci from "./Fibonacci";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Link to="/">Home</Link>
        <br />
        <Link to="/otherpage">Other Page</Link>
        <br />
        <br />
        <div>
          <Route exact path="/" component={Fibonacci} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
