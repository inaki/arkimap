import { createStore, action } from "easy-peasy";

export default createStore({
  adminContent: "projects",

  setAdminContent: action((state, payload) => {
    state.adminContent = payload;
  }),
});
