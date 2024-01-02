import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    avatar: '',
    id: '',
    access_token: '',
    isAdmin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', phone = '', address = '', city = '', avatar = '', _id = '', isAdmin } = action.payload
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.city = city;
            state.avatar = avatar;
            state.id = _id;
            state.isAdmin = isAdmin

            state.access_token = access_token
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.city = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer