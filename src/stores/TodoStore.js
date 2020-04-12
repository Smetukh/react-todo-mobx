import uuid from "uuid/v4";
import { types as t } from "mobx-state-tree";
import { prettyPrint } from "../utils";

const state = {
  list: [
    {
      id: uuid(),
      title: "potato"
    }
  ]
};

const TodoModel = t
  .model("TodoModel", {
    id: t.string,
    title: t.string,
    isCompleted: t.optional(t.boolean, false),
    isFavorite: t.optional(t.boolean, false)
  })
  .actions(store => ({
    toggleComplete() {
      store.isCompleted = !store.isCompleted;
    },
    toggleFavorite() {
      store.isFavorite = !store.isFavorite;
    }
  }));

const TodoListmodel = t
  .model("TodoListmodel", {
    list: t.array(TodoModel)
  })
  .views(store => ({
    getFavoriteList() {
      return store.list.filter(item => item.isFavorite);
    }
  }))
  .actions(store => ({
    add(title) {
      const todo = {
        id: uuid(),
        title
      };
      store.list.unshift(todo);
    }
  }));
console.log(TodoListmodel);
// const todoList = TodoListModel.create(state);

// todoList.add("chocolate");
// todoList.add("oil");

// todoList[1].toggleFavorite();
// todoList[1].toggleComplete();

// prettyPrint(todoList.favoriteList);
