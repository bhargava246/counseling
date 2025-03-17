import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from "./reducers/userReducers"
import {
  studentProfileReducer,
  studentUpdateProfileReducer,
  studentListReducer,
  studentDetailsReducer,
  studentSavedCollegesReducer,
} from "./reducers/studentReducers"
import {
  collegeListReducer,
  collegeDetailsReducer,
  collegeCreateReducer,
  collegeUpdateReducer,
  collegeDeleteReducer,
  collegeRecommendationsReducer,
} from "./reducers/collegeReducers"
import {
  sessionListReducer,
  sessionDetailsReducer,
  sessionCreateReducer,
  sessionUpdateReducer,
  studentSessionsReducer,
  counselorSessionsReducer,
} from "./reducers/sessionReducers"

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  studentProfile: studentProfileReducer,
  studentUpdateProfile: studentUpdateProfileReducer,
  studentList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentSavedColleges: studentSavedCollegesReducer,
  collegeList: collegeListReducer,
  collegeDetails: collegeDetailsReducer,
  collegeCreate: collegeCreateReducer,
  collegeUpdate: collegeUpdateReducer,
  collegeDelete: collegeDeleteReducer,
  collegeRecommendations: collegeRecommendationsReducer,
  sessionList: sessionListReducer,
  sessionDetails: sessionDetailsReducer,
  sessionCreate: sessionCreateReducer,
  sessionUpdate: sessionUpdateReducer,
  studentSessions: studentSessionsReducer,
  counselorSessions: counselorSessionsReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

