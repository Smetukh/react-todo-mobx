import { TodoListModel } from "./TodoStore";
import { GroupListModel } from "./GroupStore";
import { types as t, onSnapshot } from "mobx-state-tree";
import { prettyPrint } from "../utils";

const RootModel = t.model("RootModel", {
  todos: t.optional(TodoListModel, {}),
  groups: t.optional(GroupListModel, {}),
});

const rootStore = RootModel.create({});

onSnapshot(rootStore, (snapshot) => prettyPrint(snapshot));
// autorun(() => prettyPrint(rootStore));

rootStore.todos
  .getTodos()
  .then(async () => {
    console.log("LOADING getGroups SUCCESS");
  })
  .then(async () => {
    await rootStore.groups.getGroups();
    console.log("LOADING getGroups SUCCESS");
  });

export default rootStore;
