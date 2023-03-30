import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesItem } from "../../types/movies";
import { send } from "../../utils/http";

export const getMoviesList = createAsyncThunk(
  "movies/list",
  async (filter: string = "offset=0") => {
    const response = await send(filter);
    interface DataType {
      data: MoviesItem[];
      total: number;
    }

    return {
      data: response.data.results,
      total: response.data.total,
    } as DataType;
  }
);

interface moviesState {
  list: MoviesItem[];
  favourites: MoviesItem[];
  totalItems: number;
  limit: number;
}

const initialState: moviesState = {
  list: [],
  favourites: [],
  totalItems: 0,
  limit: 42,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMoviesList.fulfilled, (state, { payload }) => {
      state.list = payload.data;
      state.totalItems = payload.total;
    });
  },
});

export const moviesList = (state: { movies: moviesState }) => state.movies.list;
export const favouritesList = (state: { movies: moviesState }) =>
  state.movies.favourites;
export const totalItems = (state: { movies: moviesState }) =>
  state.movies.totalItems;
export const limit = (state: { movies: moviesState }) => state.movies.limit;

export const { setState } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
