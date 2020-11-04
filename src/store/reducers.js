import { SET_CENTER, SET_ZOOM } from './actions';

const reducers = (state = [], action) => {
  const { data } = action;
  switch (action.type) {
    case SET_CENTER:
      return { ...state, center: data };
    case SET_ZOOM:
      return { ...state, zoom: data };
    default:
      return state;
  }
};
export default reducers;
