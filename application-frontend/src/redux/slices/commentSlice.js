import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
    updateCommentList(state, action) {
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentActions, commentReducer };
