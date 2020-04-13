import React, { useState } from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faCircle,
  faStar,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

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

const TodoItem = observer(({ todo }) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-blue": true,
    "main__todos-crossedText": todo.isCompleted,
  });
  return (
    <li key={todo.id} className="main__todos-todoItem">
      <FontAwesomeIcon
        className={classNames("main__todos-faIcon", "main__color-blue")}
        size="xs"
        icon={todo.isCompleted ? faCheckCircle : faCircle}
        onClick={() => todo.toggleComplete()}
      />
      <span className={cn} onClick={() => todo.toggleComplete()}>
        {todo.title}
      </span>

      <FontAwesomeIcon
        className={classNames("main__todos-faIcon", "main__color-blue", "main__todos-favIcon")}
        size="xs"
        icon={todo.isFavorite ? faStar : faStarOfLife}
        onClick={() => todo.toggleFavorite()}
      />
    </li>
  );
});

const Main = () => {
  prettyPrint(store);
  const [activeGroup, setActiveGroup] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const getActiveGroup = (id) => {
    console.log("found = ", id);
    const newGroup = store.groups.list.findIndex((item) => id === item.id);
    setActiveGroup(newGroup);
  };

  const addNewTodo = () => {
    if (!inputValue.trim()) return;
    store.todos.add(inputValue);
    store.groups.list[activeGroup].addTodo(store.todos.list[0]);
    setInputValue("");
  };
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      addNewTodo();
    }
  };

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    console.log("inputValue = ", inputValue);
  };

  return (
    <div className="main__container">
      <div className="main__sidebar-container">
        <div className="main__sidebar-options">
          <FontAwesomeIcon
            className={classNames("main__todos-faIcon", "main__color-blue")}
            size="xs"
            icon={faStar}
            // onClick={() => todo.toggleFavorite()}
          />
          <span>Important</span>
        </div>
        <ul>
          {values(store.groups.list).map((group) => (
            <GroupItem group={group} getActiveGroup={getActiveGroup} />
          ))}
        </ul>
      </div>

      <div className="main__todos-container">
        <div className="main__todos-title">
          <h2 className="main__todos-titleText">
            {store.groups.list[activeGroup].title}
          </h2>
        </div>
        <ul className="main_todos-listContainer">
          <li className="main__todos-listItem">
            <FontAwesomeIcon
              className={classNames("main__todos-faIcon", "main__color-blue")}
              size="xs"
              icon={inputValue ? faCircle : faPlus}
            />
            {/* </button> */}
            <input
              className="main__todos-input"
              onChange={inputChangeHandler}
              onKeyDown={keyPress}
              value={inputValue}
              placeholder="Add a todo"
            />
            {inputValue && (
              <button
                className="main__todos-buttonAdd"
                type="button"
                onClick={addNewTodo}
              >
                ADD
              </button>
            )}
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
