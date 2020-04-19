import { v4 as uuid } from "uuid";
import { types as t, flow, getRoot } from "mobx-state-tree";
import Api from "../api/Api";

export const TodoModel = t
  .model("TodoModel", {
    id: t.identifier,
    title: t.string,
    isCompleted: t.optional(t.boolean, false),
    isFavorite: t.optional(t.boolean, false),
    isToggling: false,
    isTogglingError: false,
    isSending: false,
    isSendingError: false,
    isCreatedLocally: false,
    isLoading: false,
    isLoadingError: false,
    activeGroupId: "",
  })
  .actions((store) => ({
    afterAttach() {
      if (store.isCreatedLocally) {
        store.send();
      }
    },
    send: flow(function* send() {
      store.isSending = true;
      store.isSendingError = false;
      try {
        const todo = yield Api.Todos.add(store);

        getRoot(store).groups.replaceTodoRef(
          store.activeGroupId,
          store.id,
          todo.id
        );
        yield Api.Groups.addTodo(store.activeGroupId, todo);
        getRoot(store).todos.replaceItem(store.id, todo);
        store.isSending = false;
        store.isCreatedLocally = false;
        store.activeGroupId = "";
      } catch (error) {
        console.log(error);
        store.isSendingError = true;
        store.isSending = false;
      }
    }),
    toggleStatus: flow(function* toggleStatus(status) {
      const oldValue = store[status];
      store.isToggling = true;
      store.isTogglingError = false;
      store[status] = !store[status];
      try {
        yield Api.Todos.update(store.id, { [status]: store[status] });
      } catch (error) {
        console.log(error);
        store.isTogglingError = true;
        store[status] = oldValue;
      } finally {
        store.isToggling = false;
      }
    }),
  }));

export const TodoListModel = t
  .model("TodoModel", {
    list: t.array(TodoModel),
    isLoading: false,
    isLoadingError: false,
    activeGroupId: '',
  })
  .views((store) => ({
    get favoriteList() {
      return store.list.filter((item) => item.isFavorite);
    },
    get completedList() {
      return store.list.filter((item) => item.isCompleted);
    },
  }))
  .actions((store) => ({
    add(activeGroupIndex, activeGroupId, title) {
      const todo = {
        id: uuid(),
        title,
        isCreatedLocally: true,
        activeGroupId: activeGroupId,
        //set default favorite status
        isFavorite: activeGroupIndex === "Important" ? true : false,
      };
      store.list.unshift(todo);
    },

    replaceItem(id, todo) {
      const index = store.list.findIndex((item) => item.id === id);
      if (index > -1) {
        store.list[index] = todo;
      }
    },

    getTodos: flow(function* getTodos() {
      store.isLoading = true;
      store.isLoadingError = false;
      try {
        const todos = yield Api.Todos.getAll();
        store.list = todos;
      } catch (error) {
        console.log(error);
        store.isLoadingError = true;
      } finally {
        store.isLoading = false;
      }
    }),
  }));
