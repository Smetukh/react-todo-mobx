import { v4 as uuid } from "uuid";
import { TodoModel } from "./TodoStore";
import { types as t } from "mobx-state-tree";
import { prettyPrint } from "../utils";

const GroupModel = t
  .model("ListModel", {
    id: t.string,
    title: t.string,
    todos: t.array(t.reference(TodoModel)),
  })
  .actions((store) => ({
    addTodo(todo) {
      store.todos.unshift(todo);
    },
  }));

export const GroupListModel = t
  .model("GroupListModel", {
    list: t.array(GroupModel),
  })
  .actions((store) => ({
    add(title) {
      const group = {
        id: uuid(),
        title,
      };
      store.list.unshift(group);
    },
  }));

// const group = GroupModel.create({
//   id: uuid(),
//   title: 'shippIng list'
// })

// const groupList = GroupListModel.create({
//   list: [group],
// });
