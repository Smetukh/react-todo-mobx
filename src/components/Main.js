import React, { useState } from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import store from "../stores/RootStore";
import { prettyPrint } from "../utils";

const GroupItem = observer(({ group, getActiveGroup }) => {
  return (
    <li
      key={group.id}
      // className={group.isCompleted ? "completed" : undefined}
      onClick={() => getActiveGroup(group.id)}
    >
      {group.title}
    </li>
  );
});

const TodoItem = observer(({ todo }) => (
  <li
    key={todo.id}
    className="main__todos-todoItem"
    onClick={() => todo.toggleComplete()}
  >
    <FontAwesomeIcon className="main__todos-buttonPlus" size="xs" icon={faCheckCircle} />
    <span className="main__todos-todoText">{todo.title}</span>
  </li>
));

const Main = () => {
  prettyPrint(store);
  const [activeGroup, setActiveGroup] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const getActiveGroup = (id) => {
    console.log("found = ", id);
    const newGroup = store.groups.list.findIndex((item) => id === item.id);
    setActiveGroup(newGroup);
  };

  const addNewTodo = (name) => {
    store.todos.add(name);
    store.groups.list[activeGroup].addTodo(store.todos.list[0]);
    setInputValue('');
  };

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    console.log("inputValue = ", inputValue);
  };
  return (
    <div className="main__container">
      <div className="main__sidebar-container">
        <ul>
          {values(store.groups.list).map((group) => (
            <GroupItem group={group} getActiveGroup={getActiveGroup} />
          ))}
        </ul>
      </div>

      <div className="main__todos-container">
      
        <ul className="main_todos-listContainer">
          <li className="main__todos-listItem">
              {/* <button className="main__todos-plusButton" type="button" > */}
              {/* <FontAwesomeIcon icon="check-square" /> */}
              <FontAwesomeIcon className="main__todos-buttonPlus" size="xs" icon={faPlus} />
              {/* </button> */}
            <input
              className="main__todos-input"
              onChange={inputChangeHandler}
              value={inputValue}
              placeholder="Add a todo"
            />
            <button className="main__todos-buttonAdd" type="button" onClick={() => addNewTodo(inputValue)}>
              ADD
            </button>
          </li>
          {values(store.groups.list[activeGroup].todos).map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(Main);
