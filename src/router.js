import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import About from "./components/About";
import NotFound from "./components/NotFound";

export const routes = {
  home: "/",
  groups: "/group/:id",
  about: "/about",
  completed: "/completed",
  notFound: "/notFound",
};

export default function Router() {
  console.log('routes = ', routes)
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={routes.home}
          render={(props) => <App />}
        />
        <Route path={routes.groups} component={App}/>
        <Route
          exact
          path={routes.about}
          render={(props) => <About />}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
