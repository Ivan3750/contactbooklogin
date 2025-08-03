import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://connections-api.goit.global";
const getToken = () => localStorage.getItem("token");

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  const token = getToken();
  try {
    const res = await fetch(`https://connections-api.goit.global/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Помилка ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || String(err));
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
  const token = getToken();
  try {
    const res = await fetch(`https://connections-api.goit.global/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      throw new Error(`Помилка ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || String(err));
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
  const token = getToken();
  try {
    const res = await fetch(`https://connections-api.goit.global/contacts/${contactId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Помилка ${res.status}`);
    }
    return contactId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || String(err));
  }
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default contactsSlice.reducer;
