import { v4 as uuid } from "uuid";
import { types as t, flow, getRoot } from "mobx-state-tree";
import { prettyPrint } from "../utils";
import Api from "../api/Api";

const state = {
  list: [
    {
      id: uuid(),
      title: "potato",
    },
  ],
};

export const TodoModel = t
  .model("TodoModel", {
    id: t.identifier,
    title: t.string,
    isCompleted: t.optional(t.boolean, false),
    isFavorite: t.optional(t.boolean, false),
    isTogglingFavorite: false,
    isTogglingFavoriteError: false,
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
        getRoot(store).todos.replaceItem(store.id, todo);
        console.log("todo.id = ", todo.id);
        console.log("store = ", store);
        const result = yield Api.Groups.addTodo(store.activeGroupId, todo);
        console.log("result = ", result);
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
      store.isTogglingFavorite = true;
      store.isTogglingFavoriteError = false;
      store[status] = !store[status];
      try {
        yield Api.Todos.update(store.id, { [status]: store[status] });
      } catch (error) {
        console.log(error);
        store.isTogglingFavoriteError = true;
        store[status] = oldValue;
      } finally {
        store.isTogglingFavorite = false;
      }
    }),
  }));

export const TodoListModel = t
  .model("TodoModel", {
    list: t.array(TodoModel),
    isLoading: false,
    isLoadingError: false,
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
    add(activeGroupId, title) {
      const todo = {
        id: uuid(),
        title,
        isCreatedLocally: true,
        activeGroupId,
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
