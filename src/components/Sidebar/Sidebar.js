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
  const importantItem = { id: "Important", title: "Important", icon: faStar };
  return (
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
