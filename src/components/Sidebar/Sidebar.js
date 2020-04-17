import React from "react";
import { values } from "mobx";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar, faList } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import store from "../../stores/RootStore";

import GroupItem from "./GroupItem";



const Sidebar = ({
  active,
  getActiveGroup,
  inputGroup,
  inputGroupChangeHandler,
  keyGroupPress,
}) => {
  const cnNewGroup = classNames({
    "main__todos-faIcon": true,
    "main__color-grey": !inputGroup,
    "main__color-blue": inputGroup,
  });
  const importantItem = {
    id: "Important",
    title: "Important",
    icon: faStar,
    todos: [],
  };
  return (
    <div className="main__sidebar-container">
      <ul className="main__sidebar-list">
        <GroupItem
          active={active}
          key={importantItem.id}
          group={importantItem}
          activeItem={active.group === "Important"}
          icon={importantItem.icon}
          getActiveGroup={getActiveGroup}
          todosFavorite={store.todos.favoriteList}
        />
        {values(store.groups.list).map((group, index) => (
          <GroupItem
            active={active}
            key={group.id}
            group={group}
            icon={faList}
            activeItem={index === active.group}
            getActiveGroup={getActiveGroup}
            todosCompleted={store.todos.completedList}
          />
        ))}
        <li className="main__todos-listItem">
          <FontAwesomeIcon className={cnNewGroup} size="xs" icon={faPlus} />
          <input
            className="main__todos-input"
            onChange={inputGroupChangeHandler}
            onKeyDown={keyGroupPress}
            value={inputGroup}
            placeholder="New List"
          />
        </li>
      </ul>
    </div>
  );
};

export default observer(Sidebar);
