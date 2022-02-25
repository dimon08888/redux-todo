import { StatusFilter } from './types';

type FiltersState = {
  status: StatusFilter;
  colors: string[];
};

const initialState: FiltersState = {
  status: StatusFilter.ALL,
  colors: [],
};

type FiltersAction =
  | { type: 'filters/statusChange'; payload: StatusFilter }
  | {
      type: 'filters/colorsChange';
      payload: { color: string; changeType: 'add' | 'remove' };
    };

export default function filtersReducer(
  state = initialState,
  action: FiltersAction,
): FiltersState {
  switch (action.type) {
    case 'filters/statusChange': {
      return { ...state, status: action.payload };
    }
    case 'filters/colorsChange': {
      const { color, changeType } = action.payload;
      switch (changeType) {
        case 'add': {
          if (state.colors.includes(color)) return state;
          return { ...state, colors: [...state.colors, color] };
        }
        case 'remove': {
          return {
            ...state,
            colors: state.colors.filter(existingColor => existingColor !== color),
          };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
}
