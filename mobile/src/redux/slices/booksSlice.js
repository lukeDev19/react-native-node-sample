import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async query => {
    const response = await axios.get(
      `http://backend-api-url/search?query=${query}`,
    );
    return response.data;
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchBooks.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
