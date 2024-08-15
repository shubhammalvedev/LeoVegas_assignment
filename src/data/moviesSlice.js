import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "fetch-movies",
  async ({ url, page=1}) => {
    const response = await fetch(`${url}&page=${page}`);
    return response.json();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {
      results: [],
    },
    page: 1,
    hasMore: true,
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const newMovies = action.payload.results;
        state.movies.results = [...state.movies.results, ...newMovies];
        state.page += 1;
        state.hasMore = newMovies.length > 0;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
