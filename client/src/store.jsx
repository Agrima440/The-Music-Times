import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";

// Add this line to get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// Updated store creation without devtools extension
export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

// export default store; 
