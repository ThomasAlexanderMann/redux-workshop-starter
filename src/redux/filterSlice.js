import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filterActive: false
    },
    reducers: {
        toggleFilter(state) {
            state.filterActive = !state.filterActive
        }
    }
})

export const selectFilterStatus = state => state.filter.filterActive

export default filterSlice.reducer

export const {toggleFilter} = filterSlice.actions