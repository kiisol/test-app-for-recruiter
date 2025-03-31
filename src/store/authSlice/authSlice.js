import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null ,
    users: [] //для списка пользователей
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload;
        },
        clearUser:(state)=> {
            state.user = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload
        }

    }
})

export const {setUser, clearUser,setUsers } = authSlice.actions;
export default authSlice.reducer