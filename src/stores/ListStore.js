import uuid from 'uuid/v4'
import { TodoModel } from 'TodoStore'
import { types as t } from "mobx-state-tree"

const ListModel = t
  .model('ListModel', {
  id: t.string,
  title: t.string,
  todos: t.array(TodoModel),
})
  .actions((store) => ({
    toggleCompleted() {
      store.isCompleted = !store.isCompleted;
    },
    toggleFavorite() {
      store.isFavorite = !store.isFavorite;
    }
  }));

  const GroupListModel = t
  .model('GroupListModel', {
  list: t.array(TodoModel),
})
  .views((store) => ({
    getFavoriteList () {
      return store.list.filter(item => item.isFavorite)
    },
    
  }))
  .actions((store) => ({
    add(title) => {

    }
  });
