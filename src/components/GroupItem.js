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

const GroupItem = observer(
  ({ group, active, icon, todosFavorite = [], getActiveGroup }) => {
    const cn = classNames({
      "main__todos-todoText": true,
      "main__color-grey": !active,
      "main__color-blue": active,
    });
    let filteredList = null;
    let todoNumber = null;
    console.log("todosFavorite = ", JSON.stringify(todosFavorite));
    console.log("group.title = ", group.title);
    if (group.title !== "Important") {
      filteredList = group.todos.filter((todo) => todo.isCompleted);
      todoNumber = group.todos.length - filteredList.length;
    } else {
      todoNumber = todosFavorite.length;
    }
    console.log("todoNumber = ", todoNumber);
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
  }
);

export default GroupItem;