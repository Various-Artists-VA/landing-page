import React from "react";
import "./App.css";
import { BottomBar } from "va-components";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import BetaPage from "./pages/BetaPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/beta" component={BetaPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </header>
        <BottomBar
          onBack={() => {
            history.goBack();
          }}
          actions={[
            {
              name: "About",
              onClick: (e) => {
                e.preventDefault();
                history.push("/about");
              },
            },
          ]}
        />
      </div>
    </Router>
  );
}
