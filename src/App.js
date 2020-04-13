import React from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import "./styles.css";
import store from "./stores/RootStore";

import Navbar from './components/Navbar';
import Main from './components/Main';




function App() {
  console.log('render App ')
  return (
    <div className="App">
      <Navbar />
      <Main />
      {/* <ul>
        {values(store.todos.list).map(todo => (
          <TodoItem todo={todo} />
        ))}
      </ul> */}
      
    </div>
  );
}

export default observer(App);
