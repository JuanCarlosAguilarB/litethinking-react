import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'companies';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const companyActions = { ...slice.actions, ...extraActions };
export const companiesReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        companies: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api/v0/companies/companies`;

    return {
        getAllCompanies: getAllCompanies()
    };

    function getAllCompanies() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAllCompanies()
    };
    function getAllCompanies() {
        let { pending, fulfilled, rejected } = extraActions.getAllCompanies;


        return {
            [pending]: (state) => {
                state.companies = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.companies = action.payload.results;
                console.log( state.companies, 'companies')
            },
            [rejected]: (state, action) => {
                state.companies = { error: action.error };
            }
        };
    }
}
