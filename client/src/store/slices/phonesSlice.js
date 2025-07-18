import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./../../constants";
import * as API from './../../api';

const initialState = {
    phones: [],
    processors: [],
    page: 1,
    isFetching: false,
    error: null,
}

export const getProcessorsThunk = createAsyncThunk(`${CONSTANTS.PHONES_SLICE_NAME}/get/processors`, 
    async (payload, {rejectWithValue}) => {
        try {
           const {data: {data}} = await API.getProcessors();
           return data; 
        } catch (err) {
            return rejectWithValue({errors: err.response.data});
        };
    }
);

export const createPhoneThunk = createAsyncThunk(`${CONSTANTS.PHONES_SLICE_NAME}/create/phones`, 
    async (payload, {rejectWithValue}) => {
        try {
           const {data: {data}} = await API.createPhone(payload);
           return data; 
        } catch (err) {
            return rejectWithValue({errors: err.response.data});
        };
    }
);

export const getPhonesThunk = createAsyncThunk(`${CONSTANTS.PHONES_SLICE_NAME}/get/phones`, 
    async (payload, {rejectWithValue}) => {
        try {
           const {data: {data}} = await API.getPhones(payload);
           return data; 
        } catch (err) {
            return rejectWithValue({errors: err.response.data});
        };
    }
);
 
const phonesSlice = createSlice({
    name: CONSTANTS.PHONES_SLICE_NAME,
    initialState,
    reducers: {
        changePage: (state, {payload}) => {
            state.page = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getProcessorsThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getProcessorsThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.processors = [...payload];
            state.error = null;
        });
        builder.addCase(getProcessorsThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(createPhoneThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(createPhoneThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.phones.push(payload);
            state.error = null;
        });
        builder.addCase(createPhoneThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(getPhonesThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getPhonesThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.phones = [...payload];
            state.error = null;
        });
        builder.addCase(getPhonesThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });
    }
});

const {reducer, actions} = phonesSlice;

export const {changePage} = actions;

export default reducer;