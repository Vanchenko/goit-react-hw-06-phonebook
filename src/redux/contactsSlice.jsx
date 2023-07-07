import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialContacts = []; 

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContacts(state, action) {
      const contact = { ...action.payload, id: nanoid() };
      state.push(contact);
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContacts, deleteContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
