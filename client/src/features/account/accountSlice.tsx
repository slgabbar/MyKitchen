import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { router } from "../../app/router/Routes";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user))
            return user;
        }
        catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUserAsnyc = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user))
            return user;
        }
        catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            return !!localStorage.getItem('user');
        }
    }
)

export const registerUserAsync = createAsyncThunk<User, FieldValues>(
    'account/registerUser',
    async (data, thunkApi) => {
        try {
            const user = await agent.Account.register(data);
            localStorage.setItem('user', JSON.stringify(user))
            return user;
        }
        catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUserAsnyc.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })

        builder.addMatcher(isAnyOf(signInUserAsync.fulfilled,
            fetchCurrentUserAsnyc.fulfilled,
            registerUserAsync.fulfilled),
            (state, action) => {
            state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUserAsync.rejected,
            registerUserAsync.rejected), (state, action) => {
            console.log(action.payload);
        })
    }),
})

export const {signOut, setUser} = accountSlice.actions;