import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tagReducer from "./tagReducer"
const rootReducer = combineReducers({

    auth: authReducer,
    tag: tagReducer,
});

export default rootReducer;