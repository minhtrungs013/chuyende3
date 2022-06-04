import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import BasicForm from "../components/login/index.js";
import "../asset/css/navbar.css";
import "../asset/css/header.css";
import { useSelector } from "react-redux";
import Navbar from "../components/home/navbar/index";
import Header from "../components/home/header/index";
import Batch from "../components/main/batch/index";
import Home from "../components/home/index";
import indexStudent from "../components/student/index";
import Internships from "../components/main/internships/index";
function App() {
  const isAuthen = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!isAuthen && <Redirect to="/login" />}
          {isAuthen && <Redirect to="/batch" />}
        </Route>
        <Route path="/login" exact>
          <BasicForm />
        </Route>
        {isAuthen && (
          <>
            <Header />
            <Navbar />
            <Switch>
              <Route>
                {/* <Route path="/candidate" exact component={indexCandidate} />
                <Route path="/mentor" exact component={indexMentor} /> */}
                <Route path="/student" exact component={indexStudent} />
                <Route path="/home/batch" exact component={Home} />
                <Route path="/batch" exact component={Batch} />
                <Route path="/internshipcourse" exact component={Internships} />
                {/* <Route path="/interview" exact component={Interview} />
             
                <Route path="/dg" exact component={DG} /> */}
              </Route>
            </Switch>
          </>
        )}

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
