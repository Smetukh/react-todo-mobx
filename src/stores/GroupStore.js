import { v4 as uuid } from "uuid";
import { TodoModel } from "./TodoStore";
import { types as t, flow, getRoot } from "mobx-state-tree";
import Api from "../api/Api";

const GroupModel = t
  .model("ListModel", {
    id: t.string,
    title: t.string,
    todos: t.array(t.reference(TodoModel)),
    isSending: false,
    isSendingError: false,
    isCreatedLocally: false,
    isLoading: false,
    isLoadingError: false,
  })
  .actions((store) => ({
    addTodo(todo) {
      store.todos.unshift(todo);
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
        getRoot(store).groups.replaceGroup(store.id, group);
        store.isCreatedLocally = false;
      } catch (error) {
        console.log(error);
        store.isSendingError = true;
      } finally {
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
      const activeGroupIndex = getRoot(store).groups.list.findIndex(
        (group) => group.id === activeGroupId
      );
      const index = getRoot(store).groups.list[
        activeGroupIndex
      ].todos.findIndex((item) => item.id === id);
      if (index > -1) {
        store.list[activeGroupIndex].todos[index] = newId;
      }
    },
    getGroups: flow(function* getGroups() {
      store.isLoading = true;
      store.isLoadingError = false;

      try {
        let groups = yield Api.Groups.getAll();
        if (!groups.length) {
          yield store.add('Tasks');
          groups = yield Api.Groups.getAll();
          
        }
        store.list = groups;
      } catch (error) {
        console.log(error);
        store.isLoadingError = true;
      } finally {
        store.isLoading = false;
      }
    }),
  }));
