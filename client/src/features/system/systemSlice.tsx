import { createSlice } from "@reduxjs/toolkit";

interface SystemSettingsState {
    sideNavOpen: boolean;
}

const initialState: SystemSettingsState = {
    sideNavOpen: true,
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        toggleSideNavState: (state) => {
            state.sideNavOpen = !state.sideNavOpen;
        }
    },
})

export const { toggleSideNavState } = systemSlice.actions;