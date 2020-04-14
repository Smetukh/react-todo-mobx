import { v4 as uuid } from "uuid";
import { types as t } from "mobx-state-tree";
import { prettyPrint } from "../utils";

const state = {
  list: [
    {
      id: uuid(),
      title: "potato",
    },
  ],
};

// const TodoModel = t
//   .model("TodoModel", {
//     id: t.string,
//     title: t.string,
//     isCompleted: t.optional(t.boolean, false),
//     isFavorite: t.optional(t.boolean, false),
//   })
//   .actions((store) => ({
//     toggleComplete() {
//       store.isCompleted = !store.isCompleted;
//     },
//     toggleFavorite() {
//       store.isFavorite = !store.isFavorite;
//     },
//   }));

// const TodoListmodel = t
//   .model("TodoListmodel", {
//     list: t.array(TodoModel),
//   })
//   .views((store) => ({
//     getFavoriteList() {
//       return store.list.filter((item) => item.isFavorite);
//     },
//   }))
//   .actions((store) => ({
//     add(title) {
//       const todo = {
//         id: uuid(),
//         title,
//       };
//       store.list.unshift(todo);
//     },
//   }));

export const TodoModel = t
  .model("TodoModel", {
    id: t.identifier,
    title: t.string,
    isCompleted: t.optional(t.boolean, false),
    isFavorite: t.optional(t.boolean, false),
  })
  .actions((store) => ({
    toggleComplete() {
      store.isCompleted = !store.isCompleted;
    },
    toggleFavorite() {
      store.isFavorite = !store.isFavorite;
    },
  }));

export const TodoListModel = t
  .model("TodoModel", {
    list: t.array(TodoModel),
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
    add(title) {
      const todo = {
        id: uuid(),
        title,
      };
      store.list.unshift(todo);
    },
  }));

// const todo1 = TodoModel1.create({ id: uuid(), title: "potato" });

// const todoList = TodoListModel.create(state);

// const todoList = TodoListModel.create(state);

// todoList.add("chocolate");
// todoList.add("oil");


// todoList[1].toggleComplete();
// todo1.toggleComplete();
// todoList.add("chocolate");
// todoList.list[1].toggleComplete();
// todoList.list[1].toggleFavorite();
// prettyPrint(todoList);
// prettyPrint(todoList.favoriteList);
// prettyPrint(todo1);
