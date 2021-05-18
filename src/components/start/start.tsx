import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";

export default function Start(): JSX.Element {
  return (
    <>
      <div className="main">
        <Paper elevation={3} className="main2">
          <h1 className="quizApp">Quiz App</h1>

          <Link to="/start" className="btn-1">
            <Button variant="contained" color="primary">
              Click here to Start Quiz
            </Button>
          </Link>
        </Paper>
      </div>
    </>
  );
}

{
  /* <Link to="/start">
<Button variant="contained" color="primary" className="btn-1">
  Start Quiz
</Button>
</Link> */
}
