import axios from "axios"

export const getPosts = async () => await axios.get("/api/posts/all")

export const createPost = async (post) =>
  await axios.post("/api/posts/create", post)
