import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherType: "Clear",
        time: "day"
    },
    reducers: {
        updateWeather: (state, action) => {
            state.weatherType = action.payload.weatherType
            state.time = action.payload.time
        }
    }
})

export const { updateWeather } = weatherSlice.actions
export default weatherSlice.reducer


