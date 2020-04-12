import React from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import "./styles.css";
import store from "./stores/TodoStore";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default observer(App);
