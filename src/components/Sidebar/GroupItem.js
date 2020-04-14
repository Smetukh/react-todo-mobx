import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const GroupItem = ({
  group,
  active,
  icon,
  todosFavorite = [],
  getActiveGroup,
}) => {
  const cn = classNames({
    "main__todos-todoText": true,
    "main__color-grey": !active,
    "main__color-blue": active,
  });
  let filteredList = null;
  let todoNumber = null;

  if (group.title !== "Important") {
    filteredList = group.todos.filter((todo) => todo.isCompleted);
    todoNumber = group.todos.length - filteredList.length;
  } else {
    todoNumber = todosFavorite.length;
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

      {!!todoNumber && <p className="main__todos-favIcon">{todoNumber}</p>}
    </li>
  );
};
export default GroupItem;
