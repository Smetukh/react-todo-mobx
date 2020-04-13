import { v4 as uuid } from "uuid";
import { TodoListModel } from "./TodoStore";
import { GroupListModel } from "./GroupStore";
import { autorun } from 'mobx';
import { types as t, clone } from "mobx-state-tree";
import { prettyPrint } from "../utils";

const RootStore = t.model("RootStore", {
  todos: t.optional(TodoListModel, {}),
  groups: t.optional(GroupListModel, {}),
});

const rootStore = RootStore.create({});

// autorun(() => prettyPrint(rootStore));
rootStore.todos.add("POTATO");
rootStore.todos.add("OIL");
rootStore.groups.add("SHOPPING LIST");
rootStore.groups.add("WATCH LIST");
const lastTodo = rootStore.todos.list[0];
const lastGroup = rootStore.groups.list[1];

lastGroup.addTodo(lastTodo);

lastTodo.toggleComplete();

export default rootStore;
