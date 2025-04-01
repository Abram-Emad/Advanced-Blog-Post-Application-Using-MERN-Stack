"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authReducer = exports.authActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var authSlice = (0, _toolkit.createSlice)({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    registerMessage: null,
    isEmailVerified: false
  },
  reducers: {
    login: function login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout: function logout(state) {
      state.user = null;
    },
    register: function register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserPhoto: function setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUsername: function setUsername(state, action) {
      state.user.username = action.payload;
    },
    setIsDarkModeActivated: function setIsDarkModeActivated(state, action) {
      state.user.darkMode = action.payload;
    },
    setIsEmailVerified: function setIsEmailVerified(state) {
      state.isEmailVerified = true;
      state.registerMessage = null;
    }
  }
});
var authReducer = authSlice.reducer;
exports.authReducer = authReducer;
var authActions = authSlice.actions;
exports.authActions = authActions;