import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBlog,getAllBlogs,updateBlog,deleteBlog,getBlogById } from '../api';

interface Blog {
  id: string;
  image: string;
  title: string;
  author: string;
  content: string;
  date: string;
  tag: string;
}

interface RejectWithValue {
  message: string;
}

// Async thunk for adding a blog
export const AddBlog = createAsyncThunk<Blog, { image: string; title: string; author: string; content: string; date: string; tag: string }, { rejectValue: RejectWithValue }>(
    'blogs/addBlog',
    async ({ image, title, author, content, date, tag }, { rejectWithValue }) => {
      try {
        const data = await addBlog(image, title, author, content, date, tag);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error adding blog:', error.message);
          throw rejectWithValue({ message: error.message });
        }
        throw rejectWithValue({ message: 'An error occurred while adding the blog' });
      }
    }
  );
  
  // Async thunk for fetching all blogs
  export const GetAllBlogs = createAsyncThunk<Blog[], void, { rejectValue: RejectWithValue }>(
    'blogs/getAllBlogs',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getAllBlogs();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching blogs:', error.message);
          throw rejectWithValue({ message: error.message });
        }
        throw rejectWithValue({ message: 'An error occurred while fetching blogs' });
      }
    }
  );
  
  // Async thunk for fetching blog details by ID
  export const GetBlogById = createAsyncThunk<Blog, string, { rejectValue: RejectWithValue }>(
    'blogs/getBlogById',
    async (id, { rejectWithValue }) => {
      try {
        const data = await getBlogById(id);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching blog details:', error.message);
          throw rejectWithValue({ message: error.message });
        }
        throw rejectWithValue({ message: 'An error occurred while fetching blog details' });
      }
    }
  );
  
  // Async thunk for deleting a blog
  export const DeleteBlog = createAsyncThunk<Blog, string, { rejectValue: RejectWithValue }>(
    'blogs/deleteBlog',
    async (id, { rejectWithValue }) => {
      try {
        const data = await deleteBlog(id);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error deleting blog:', error.message);
          throw rejectWithValue({ message: error.message });
        }
        throw rejectWithValue({ message: 'An error occurred while deleting the blog' });
      }
    }
  );
  
  // Async thunk for updating a blog
  export const UpdateBlog = createAsyncThunk<Blog, { id: string; image: string; title: string; author: string; content: string; date: string; tag: string }, { rejectValue: RejectWithValue }>(
    'blogs/updateBlog',
    async ({ id, image, title, author, content, date, tag }, { rejectWithValue }) => {
      try {
        const data = await updateBlog(id, image, title, author, content, date, tag);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error updating blog:', error.message);
          throw rejectWithValue({ message: error.message });
        }
        throw rejectWithValue({ message: 'An error occurred while updating the blog' });
      }
    }
  );

// Define initial state
interface BlogState {
  blogs: Blog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  status: 'idle',
  error: null,
};

// Define the slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add reducers for each async thunk here
      .addCase(AddBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(AddBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
        state.error = null;
      })
      .addCase(AddBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(GetAllBlogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(GetAllBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(GetAllBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(GetBlogById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(GetBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = [action.payload];
        state.error = null;
      })
      .addCase(GetBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(DeleteBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(DeleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
        state.error = null;
      })
      .addCase(DeleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(UpdateBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(UpdateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex((blog) => blog.id === updatedBlog.id);
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
        state.error = null;
      })
      .addCase(UpdateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      });
  },
});

export default blogSlice.reducer;

// Selector functions
export const selectBlogs = (state: { blogs: BlogState }) => state.blogs.blogs;
export const selectBlogStatus = (state: { blogs: BlogState }) => state.blogs.status;
export const selectBlogError = (state: { blogs: BlogState }) => state.blogs.error;
