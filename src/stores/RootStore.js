import { TodoListModel } from "./TodoStore";
import { GroupListModel } from "./GroupStore";
import localForage from 'localforage';
import { types as t, onSnapshot, clone } from "mobx-state-tree";
import { prettyPrint } from "../utils";
import createPersist from "./persist";
import Api from '../api/Api';
import { runInAction } from "mobx";

const RootModel = t.model("RootModel", {
  todos: t.optional(TodoListModel, {}),
  groups: t.optional(GroupListModel, {}),
});

const rootStore = RootModel.create({});


onSnapshot(rootStore, (snapshot) => prettyPrint(snapshot));
// autorun(() => prettyPrint(rootStore));

rootStore.todos.getTodos().then(async () => {

  console.log('LOADING getGroups SUCCESS')})
  .then(async () => {
    await rootStore.groups.getGroups();
    console.log('LOADING getGroups SUCCESS')});
  
// rootStore.todos.getTodos().then(async () => {
  // await rootStore.todos.list[0].toggleFavorite();
  // console.log('LOADING getTodos SUCCESS')});

  rootStore.groups.add("SHOPPING LIST");

// const persist = createPersist(rootStore, localForage);
// persist.rehydrate();

// rootStore.todos.add("POTATO");
// rootStore.todos.add("OIL");

// rootStore.groups.add("WATCH LIST");

// const todo = rootStore.todos.list[0];
//group.add(todo.id);

// async function createTodo() {
//   const result = await Api.Todos.add(todo);
//   console.log(result);
// }

// async function getTodos() {
//   const result = await Api.Todos.getAll();
//   console.log('result getTodos() = ', result)
// }

// const lastTodo = rootStore.todos.list[0];
// const lastGroup = rootStore.groups.list[0];

// lastGroup.addTodo(rootStore.todos.list[1]);
// lastGroup.addTodo(lastTodo);

// lastTodo.toggleComplete();

// async function run() {
  // await getTodos();
  // await createTodo();
  // await getTodos();
// }

// run();

export default rootStore;
