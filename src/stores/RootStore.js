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


export default rootStore;
