import { v4 as uuid } from "uuid";
import { TodoModel } from "./TodoStore";
import { types as t, flow, getRoot } from "mobx-state-tree";
import { prettyPrint } from "../utils";
import Api from "../api/Api";


const GroupModel = t
  .model("ListModel", {
    id: t.string,
    title: t.string,
    todos: t.array(t.reference(TodoModel)),
    isSending: false,
    isSendingError: false,
    isCreatedLocally: false,
    isTodoCreatedLocally: false,
    isLoading: false,
    isLoadingError: false,

  })
  .actions((store) => ({
    addTodo(todo) {
      store.todos.unshift(todo);
      // store.isTodoCreatedLocally = true;
      // store.sendTodoRef();
    },
    afterAttach() {
      if (store.isCreatedLocally) {
        store.send();
      }
    },
    send: flow(function* send() {
      store.isSending = true;
      store.isSendingError = false;
      try {
        const group = yield Api.Groups.add(store);
        group.isSending = false;
        group.isCreatedLocally = false;

        console.log("store.id = ", store.id);
        console.log("group = ", group);

         getRoot(store).groups.replaceGroup(store.id, group);
      } catch (error) {
        console.log(error);
        store.isSendingError = true;
        store.isSending = false;
      }
    }),
    sendTodoRef: flow(function* sendTodoRef() {
      store.isSending = true;
      store.isSendingError = false;
      try {
        const group = yield Api.Groups.addTodo(store.id, store);
        group.isSending = false;
        group.isCreatedLocally = false;

        console.log("store.id = ", store.id);
        console.log("group = ", group);

         getRoot(store).groups.replaceGroup(store.id, group);
      } catch (error) {
        console.log(error);
        store.isSendingError = true;
        store.isSending = false;
      }
    }),
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
        isCreatedLocally: true,
      };
      store.list.unshift(group);
    },
    replaceGroup(id, group) {
      const index = store.list.findIndex((group) => group.id === id);
      if (index > -1) {
        store.list[index] = group;
      }
    },
    replaceTodoRef(activeGroupId, id, newId) {
      const activeGroupIndex = getRoot(store).groups.list.findIndex((group) => group.id === activeGroupId);
      console.log('activeGroupIndex = ', activeGroupIndex)
      const index = getRoot(store).groups.list[activeGroupIndex].todos.findIndex((item) => {
        console.log("item = ", item);
        return item.id === id;
      });
      if (index > -1) {
        store.list[activeGroupIndex].todos[index] = newId;

      }
    },
    getGroups: flow(function* getGroups() {
      store.isLoading = true;
      store.isLoadingError = false;

      try {
        const groups = yield Api.Groups.getAll();
        store.list = groups;
      } catch (error) {
        console.log(error);
        store.isLoadingError = true;
      } finally {
        store.isLoading = false;
      }
    }),
  }));

// const group = GroupModel.create({
//   id: uuid(),
//   title: 'shippIng list'
// })

// const groupList = GroupListModel.create({
//   list: [group],
// });
