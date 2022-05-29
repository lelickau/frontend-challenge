import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { dataFilter } from "helpers/dataFilter";
import { RootState } from "store";
import { ICat } from "types/ICat";

interface UserInitialState {
    cats: ICat[];
    favorites: ICat[];
    fetching: boolean;
    paginationCount: number;
    page: number;
    status: string;
    error: string | undefined;
}

const initialState: UserInitialState = {
    cats: [],
    favorites: [],
    paginationCount: 0,
    page: 1,
    fetching: false,
    status: '',
    error: '',
}

export const getCatsData = createAsyncThunk<any, void,{rejectValue: string, state: RootState}>(
    'cats/getCatsData',
    async (_, {rejectWithValue, dispatch, getState}) => {
        try {
            const page = getState().cats.page
            const fetchCats = await fetch(`${process.env.REACT_APP_API_URL}?limit=${process.env.REACT_APP_LIMIT}&page=${page}&size=small`, {
                headers: {
                    "X-Api-Key": `${process.env.REACT_APP_API_KEY}`
                }
            })
                .then(res => {
                    if (res.status !== 200) throw new Error('Error getting cats')

                    const paginationCount = res.headers.get('pagination-count')
                    if (paginationCount) dispatch(setPaginationCount(+paginationCount))
                    dispatch(setPage())

                    return res.json()
                })
                .finally(() => dispatch(setFetching(false)))

            return dataFilter(fetchCats)

        } catch (e) {
            console.log("Error getting cats: ", e)
            return rejectWithValue('Error getting cats')
        }
    }
)

const setLoading = (state: UserInitialState) => {
    state.status = 'loading'
    state.error = ''
}

const setRejected = (state: UserInitialState, action: PayloadAction<string | undefined>) => {
    state.status = 'rejected'
    state.error = action.payload
}

const updateData = (state: UserInitialState, action: PayloadAction<ICat[]>) => {
    state.status = 'fulfilled'
    state.cats = [...state.cats, ...action.payload]
    state.error = ''
}

export const catsSlice = createSlice({
    name: 'catsSlice',
    initialState,
    reducers: {
        setPaginationCount: (state, action) => {
            state.paginationCount = action.payload
        },
        setPage: (state) => {
            state.page = state.page + 1
        },
        setFetching: (state, action) => {
            state.fetching = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCatsData.pending, setLoading)
            .addCase(getCatsData.rejected, setRejected)
            .addCase(getCatsData.fulfilled, updateData)
    }
})

export const {setPaginationCount, setFetching, setPage} = catsSlice.actions
export default catsSlice.reducer
