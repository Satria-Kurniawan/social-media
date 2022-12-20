import { createSlice } from "@reduxjs/toolkit"
import { getPosts, createPost, likeOrDislikePost } from "./postsActions"

const initialState = {
  posts: [],
  loading: false,
  error: false,
  message: "",
}

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.posts = action.payload.posts.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload
    },
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.error = false
      state.posts = [action.payload.post, ...state.posts]
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload
    },
    [likeOrDislikePost.fulfilled]: (state, action) => {
      state.error = true
      action.payload.data.message === "Post liked."
        ? state.posts.map(
            (post) =>
              post._id === action.payload.postId &&
              (post.likes = [...post.likes, action.payload.data.userData])
          )
        : state.posts.map(
            (post) =>
              post._id === action.payload.postId &&
              (post.likes = post.likes.filter(
                (pl) => pl.userId !== action.payload.data.userData.userId
              ))
          )
    },
  },
})

// export const {} = postSlice.actions
export default postSlice.reducer
