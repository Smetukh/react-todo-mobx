import React, { useState } from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import store from "../stores/RootStore";

import Sidebar from "./Sidebar/Sidebar";
import TodoList from "./TodoList/TodoList";

const Main = () => {
  const [active, setActive] = useState({
    group: "Important",
  });
  const [inputValue, setInputValue] = useState("");
  const [inputGroup, setInputGroup] = useState("");
  const storeGroupList = store.groups.list;

  const getActiveGroup = (id) => {
    const newGroupIndex = storeGroupList.findIndex((item) => id === item.id);
    if (newGroupIndex === -1) {
      const favoriteList = store.todos.favoriteList;
      setActive({ group: "Important", todos: favoriteList });
    } else {
      setActive({
        group: newGroupIndex,
      });
    }
  };

  const addNewTodo = () => {
    if (!inputValue.trim()) return;
    

    //pass active group id and new todo to add todo reference in active group
    const activeGroup =
      active.group === "Important"
        ? storeGroupList.length - 1
        : active.group;
    store.todos.add(
      active.group,
      storeGroupList[activeGroup].id,
      inputValue
    );

    storeGroupList[activeGroup].addTodo(store.todos.list[0]);
    setActive({
      group: active.group,
    });
    setInputValue("");
  };
  const keyPress = (e) => {
    if (e.keyCode === 13) {
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
      todos: values(storeGroupList[0].todos),
    });
    setInputGroup("");
  };
  const keyGroupPress = (e) => {
    if (e.keyCode === 13) {
      addNewGroup();
    }
  };

  const inputGroupChangeHandler = (event) => {
    setInputGroup(event.target.value);
  };
  return (
    <div className="main__container">
      {storeGroupList.length ? (
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
