import { StatusFilter } from './types';
import { createSlice } from '@reduxjs/toolkit';

type FiltersState = {
  status: StatusFilter;
  colors: string[];
};

const initialState: FiltersState = {
  status: StatusFilter.ALL,
  colors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    colorFilterChange: {
      reducer: (state, action) => {
        const { color, changeType } = action.payload;
        switch (changeType) {
          case 'add': {
            if (!state.colors.includes(color)) {
              state.colors.push(color);
            }
            break;
          }
          case 'remove': {
            state.colors = state.colors.filter(existingColor => existingColor !== color);
          }
        }
      },
      prepare: ((color: string, changeType: string) => {
        return { payload: { color, changeType } };
      }) as any,
    },
  },
});

export const { statusFilterChange, colorFilterChange } = filtersSlice.actions;
export default filtersSlice.reducer;
