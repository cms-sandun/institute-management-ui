import React from "react";
import Dashboard from "./views/Common/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import ExamEnrollSuccessPage from "./views/ExamEnrollementSuccessPage/ExamEnrollSuccessPage";

function App() {
  return (
    <BrowserRouter>
        {
            window.location.href.includes("/exams/enroll") ?
                <Route path="/exams/enroll" exact render={(props) => (
                    <ExamEnrollSuccessPage {...props}/>
                )} />
                : <Dashboard />
        }
    </BrowserRouter>
  );
}

export default App;
