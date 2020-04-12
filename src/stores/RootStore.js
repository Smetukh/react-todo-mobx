const RootStore = types.model({
  users: types.map(User),
  todos: types.optional(types.map(Todo), {})
});
