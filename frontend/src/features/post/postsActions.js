import { createAsyncThunk } from "@reduxjs/toolkit"
import * as postAPI from "./postsApi"

export const getPosts = createAsyncThunk("posts/all", async (_, thunkAPI) => {
  try {
    const response = await postAPI.getPosts()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const createPost = createAsyncThunk(
  "posts/create",
  async (post, thunkAPI) => {
    try {
      const response = await postAPI.createPost(post)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
