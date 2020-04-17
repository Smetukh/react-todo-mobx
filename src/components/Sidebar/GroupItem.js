import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { routes } from "../../router";

const GroupItem = ({
  group = {
    id: null,
  },
  activeItem,
  icon,
  todosFavorite = [],
  getActiveGroup,
}) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-grey": !activeItem,
    "main__color-blue": activeItem,
  });
  const newPath = `${routes.groups}${group.id}`;
  console.log("group = ", group);
  let filteredList = null;
  let todoNumber = null;
  if (group.title !== "Important") {
    filteredList = group.todos.filter((todo) => todo.isCompleted);
    todoNumber = group.todos.length - filteredList.length;
  } else {
    todoNumber = todosFavorite.length;
  }
  return (
    <Link to={`/groups/${group.id}`}>
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
    </Link>
  );
};
export default GroupItem;
