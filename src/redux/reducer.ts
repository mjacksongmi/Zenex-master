import { combineReducers } from "redux";

const createReducer = handlers => (state = {}, action) => {
  if (!handlers.hasOwnProperty(action.type)) { return state; }
  return handlers[action.type](state, action);
};

export const user = createReducer({ "SET_USER": (state, action: { user; }) => action.user });
export const token = createReducer({ "SET_TOKEN": (state, action: { token; }) => action.token });
export const meta = createReducer({ "SET_META": (state, action: { meta; }) => action.meta });

export const settings = createReducer({ "SET_SETTING": (state, action: { key; value; }) => { let st = {...state}; st[action.key] = action.value; return st; } });
export const categories = createReducer({ "SET_CATEGORIES": (state, action: { categories; }) => action.categories });
export const catalog = createReducer({ "SET_CATALOG": (state, action: { catalog; }) => action.catalog });

export default combineReducers({
  user,
  token,
  meta,
  settings,
  categories,
  catalog,
});