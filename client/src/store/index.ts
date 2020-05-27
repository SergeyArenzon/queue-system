import { authReducer } from "./auth/auth.reducer";
import { serviceReducer } from "./service/service.reducer";
import { businessReducer } from "./business/business.reducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  business: businessReducer,
});
