import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import store from "../../stores/RootStore";

import TodoItem from "./TodoItem";

const TodoList = ({
  active,
  inputChangeHandler,
  keyPress,
  inputValue,
  addNewTodo,
}) => {
  return (
    <div className="main__todos-container">
      <div className="main__todos-title">
        <h2 className="main__todos-titleText">
          {store.groups.list[active.group]
            ? store.groups.list[active.group].title
            : "Important"}
        </h2>
      </div>
      <ul className="main_todos-listContainer">
        <li className="main__todos-listItem">
          <FontAwesomeIcon
            className={classNames("main__todos-faIcon", "main__color-blue")}
            size="xs"
            icon={inputValue ? faCircle : faPlus}
          />
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
        {active.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default observer(TodoList);
