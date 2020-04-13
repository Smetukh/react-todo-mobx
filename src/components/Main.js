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
  faList,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import store from "../stores/RootStore";
import { prettyPrint } from "../utils";

const GroupItem = observer(({ group, active, icon, getActiveGroup }) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-grey": !active,
    "main__color-blue": active,
    // "main__todos-crossedText": todo.isCompleted,
  });
  // const completedList = store.todos.completedList;
  let filteredList = null;
  let notCompleted = null;
  if (group.todos) {
    filteredList = group.todos.filter((todo) => todo.isCompleted);
    notCompleted = group.todos.length - filteredList.length;
  }

  return (
    <li className="main__sidebar-listItem">
      <FontAwesomeIcon
        className={classNames("main__todos-faIcon", "main__color-grey")}
        size="xs"
        icon={icon}
        onClick={() => getActiveGroup(group.id)}
      />
      <span className={cn} onClick={() => getActiveGroup(group.id)}>
        {group.title}
      </span>

      {!!notCompleted && <p className="main__todos-favIcon">{notCompleted}</p>}
    </li>
  );
});

const TodoItem = observer(({ todo }) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-blue": true,
    "main__todos-crossedText": todo.isCompleted,
  });
  const cnIcon = classNames({
    "main__todos-faIcon": true,
    "main__todos-favIcon": true,
    "main__color-blue": todo.isFavorite,
    "main__color-grey": !todo.isFavorite,
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
        className={cnIcon}
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
  const [todos, setTodos] = useState(store.groups.list[activeGroup].todos);

  const getActiveGroup = (id) => {
    console.log("found = ", id);
    const newGroup = store.groups.list.findIndex((item) => id === item.id);
    console.log("newGroup = ", newGroup);
    if (newGroup === -1) {
      const list = store.todos.favoriteList;
      console.log('list = ', list)
      console.log('list = ', store.groups.list[activeGroup].todos)
      // setTodos(list)
    } else {
      setActiveGroup(newGroup);
      setTodos(store.groups.list[activeGroup].todos);
    }
    
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
  const importantItem = {id: 'Important', title: 'Important', icon: faStar}
  return (
    <div className="main__container">
      <div className="main__sidebar-container">
        {/* <TodoItem todo={todo} /> */}
        {/* <div className="main__sidebar-important">
          <FontAwesomeIcon
            className={classNames("main__todos-faIcon", "main__color-blue")}
            size="xs"
            icon={faStar}
            // onClick={() => todo.toggleFavorite()}
          />
          <span>Important</span>
        </div> */}
        <ul className="main__sidebar-list">
          <GroupItem
            key={importantItem.id}
            group={importantItem}
            active={false}
            icon={importantItem.icon}
            getActiveGroup={getActiveGroup}
          />
          {values(store.groups.list).map((group, index) => (
            <GroupItem
              key={group.id}
              group={group}
              icon={faList}
              active={index === activeGroup}
              getActiveGroup={getActiveGroup}
            />
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
          {values(todos).map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(Main);
