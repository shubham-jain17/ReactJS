import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        btnName: "Add",
        formItems: [],
    },
    reducers: {
        add: (state, action) => {
            state.formItems.push(action.payload)
        },
        edit: (state, action) => {
            const arr = state.formItems.filter(item => item.Id !== action.payload);
            state.formItems = [...arr];

        },
        delete: (state, action) => {
            const arr = state.formItems.filter(item => item.Id !== action.payload);
            state.formItems = [...arr];
        },
        chgBtnName: (state, action) => {
            state.btnName = action.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const formActions = formSlice.actions

export default formSlice.reducer 