import { createStore } from 'redux';

// Action types
const SET_CATEGORY_DATA = 'SET_CATEGORY_DATA';
const TOGGLE_WIDGET = 'TOGGLE_WIDGET';

// Action creators
export const setCategoryData = (categories) => ({ type: SET_CATEGORY_DATA, payload: categories });
export const toggleWidget = (categoryId, widgetId) => ({ type: TOGGLE_WIDGET, payload: { categoryId, widgetId } });


const initialState = {
  categoryData: [],  
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_DATA:
      return { ...state, categoryData: action.payload };
    case TOGGLE_WIDGET:
      const updatedCategoryData = state.categoryData.map((category) => {
        if (category.id === action.payload.categoryId) {
          return {
            ...category,
            widgets: category.widgets.map((widget) =>
              widget.id === action.payload.widgetId
                ? { ...widget, isVisible: !widget.isVisible }
                : widget
            ),
          };
        }
        return category;
      });

      return { ...state, categoryData: updatedCategoryData };
    default:
      return state;
  }
};

// Create the Redux store
export const store = createStore(reducer);
