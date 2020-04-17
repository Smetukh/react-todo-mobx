import React, { useState } from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import store from "../stores/RootStore";

import Sidebar from "./Sidebar/Sidebar";
import TodoList from "./TodoList/TodoList";

const Main = () => {
  const [active, setActive] = useState({
    group: 0,
    // todos: values(store.groups.list[0].todos),
  });
  const [inputValue, setInputValue] = useState("");
  const [inputGroup, setInputGroup] = useState("");
  console.log("active = ", active);
  // console.log('todos = ', values(store.groups.list[0].todos))

  const getActiveGroup = (id) => {
    const newGroupIndex = store.groups.list.findIndex((item) => id === item.id);
    if (newGroupIndex === -1) {
      const favoriteList = store.todos.favoriteList;
      setActive({ group: "Important", todos: favoriteList });
    } else {
      setActive({
        group: newGroupIndex,
        // todos: values(store.groups.list[newGroupIndex].todos),
      });
    }
  };

  const addNewTodo = () => {
    if (!inputValue.trim()) return;
    
    //pass active group id and new todo to add todo reference in active group
    store.todos.add(store.groups.list[active.group].id, inputValue);
    
    store.groups.list[active.group].addTodo(store.todos.list[0]);
    setActive({
      group: active.group,
      todos: values(store.groups.list[active.group].todos),
    });
    setInputValue("");
  };
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      addNewTodo();
    }
  };
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const addNewGroup = () => {
    if (!inputGroup.trim()) return;
    store.groups.add(inputGroup);
    setActive({
      group: 0,
      todos: values(store.groups.list[0].todos),
    });
    setInputGroup("");
  };
  const keyGroupPress = (e) => {
    if (e.keyCode == 13) {
      addNewGroup();
    }
  };

  const inputGroupChangeHandler = (event) => {
    setInputGroup(event.target.value);
  };
  console.log("Main store = ", store);
  return (
    <div className="main__container">
      {store.groups.list.length ? (
        <>
          <Sidebar
            {...{
              active,
              getActiveGroup,
              inputGroup,
              inputGroupChangeHandler,
              keyGroupPress,
            }}
          />
          <TodoList
            {...{
              active,
              inputChangeHandler,
              keyPress,
              inputValue,
              addNewTodo,
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default observer(Main);
