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

const GroupItem = observer(({ group, active, icon, todosFavorite = [], getActiveGroup }) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-grey": !active,
    "main__color-blue": active,
  });
  let filteredList = null;
  let todoNumber = null;
  console.log('todosFavorite = ', JSON.stringify(todosFavorite))
  console.log(
    'group.title = ', group.title
  )
  if (group.title !== 'Important') {
    filteredList = group.todos.filter((todo) => todo.isCompleted);
    todoNumber = group.todos.length - filteredList.length;
  } else {
    todoNumber = todosFavorite.length;
  }
console.log(
  'todoNumber = ', todoNumber
)
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

      {!!todoNumber && <p className="main__todos-favIcon">{todoNumber}</p>}
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
  const [active, setActive] = useState({
    group: 0,
    todos: values(store.groups.list[0].todos),
  });
  const [inputValue, setInputValue] = useState("");

  const getActiveGroup = (id) => {
    const newGroupIndex = store.groups.list.findIndex((item) => id === item.id);
    if (newGroupIndex === -1) {
      const favoriteList = store.todos.favoriteList;
      setActive({ group: "Important", todos: favoriteList });
    } else {
      setActive({
        group: newGroupIndex,
        todos: values(store.groups.list[newGroupIndex].todos),
      });
    }
  };

  const addNewTodo = () => {
    if (!inputValue.trim()) return;
    store.todos.add(inputValue);
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
    console.log("inputValue = ", inputValue);
  };
  const importantItem = { id: "Important", title: "Important", icon: faStar };
  console.log("active = ", active);
  return (
    <div className="main__container">
      <div className="main__sidebar-container">
        <ul className="main__sidebar-list">
          <GroupItem
            key={importantItem.id}
            group={importantItem}
            active={active.group === "Important"}
            icon={importantItem.icon}
            getActiveGroup={getActiveGroup}
            todosFavorite={store.todos.favoriteList}
          />
          {values(store.groups.list).map((group, index) => (
            <GroupItem
              key={group.id}
              group={group}
              icon={faList}
              active={index === active.group}
              getActiveGroup={getActiveGroup}
              
            />
          ))}
        </ul>
      </div>

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
          {active.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(Main);
