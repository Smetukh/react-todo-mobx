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
  console.log('TodoItem store = ', store)
  return (
    <li key={todo.id} className="main__todos-todoItem">
      <FontAwesomeIcon
        className={classNames("main__todos-faIcon", "main__color-blue")}
        size="xs"
        icon={todo.isCompleted ? faCheckCircle : faCircle}
        onClick={() => {todo.toggleStatus('isCompleted')}}
      />
      <span className={cn} onClick={() => todo.toggleStatus('isCompleted')}>
        {todo.title}
      </span>

      <FontAwesomeIcon
        className={cnIcon}
        size="xs"
        icon={todo.isFavorite ? faStar : faStarOfLife}
        onClick={() => todo.toggleStatus('isFavorite')}
      />
    </li>
  );
});

export default TodoItem;
