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
      todo.isCreatedLocally = false;
      try {
        const todo = yield Api.Todos.add(store);
        todo.isSending = false;

        getRoot(store).todos.replaceItem(store.id, todo);
      } catch (error) {
        console.log(error);
        store.isSendingError = true;
        store.isSending = false;
      }
    }),
    toggleComplete() {
      store.isCompleted = !store.isCompleted;
    },
    toggleFavorite: flow(function* toggleFavorite() {
      const oldValue = store.isFavorite;
      store.isTogglingFavorite = true;
      store.isTogglingFavoriteError = false;
      store.isFavorite = !store.isFavorite;

      try {
        yield Api.Todos.update({id: store.id, isFavorite: store.isFavorite });

      } catch (error) {
        console.log(error);
        store.isTogglingFavoriteError = true;
        store.isFavorite = oldValue;
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
    // add: flow(function* add(title) {
    //   const todo = TodoModel.create({
    //     id: uuid(),
    //     title,
    //   });
    //   store.list.unshift(todo);
    //   yield todo.send();
      
    // }),
    add(title) {
      const todo = {
        id: uuid(),
        title,
        isCreatedLocally: true,
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
