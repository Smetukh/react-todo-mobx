import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import About from "./components/About";
// import NotFound from "./NotFound/NotFound";

export const routes = {
  home: "/",
  about: "/about",
  completed: "/completed",
  notFound: "/notFound",
};

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={routes.home}
          render={(props) => <App {...props} checkedPosts={""} />}
        />
        {/* {/* <Route
          path={routes.active}
          render={(props) => <Home {...props} checkedPosts={false} />}
        /> */}
        <Route
          exact
          path={routes.about}
          render={(props) => <About />}
        /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}
